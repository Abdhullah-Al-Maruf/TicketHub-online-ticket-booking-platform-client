"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Modal, Input, Button } from "@heroui/react";
import { Person, Camera, ShieldCheck, PencilToSquare } from "@gravity-ui/icons";
import { BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/action/imgUpload";


export default function ReusableProfileComponent({ user }) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.image || null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarUrl(user.image || null);
    }
  }, [user]);

  const roleConfig = {
    admin: { label: "Super Admin", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    vendor: { label: "Verified Vendor", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    user: { label: "Verified User", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  };

  const currentRole = roleConfig[user?.role || "user"];

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setUploadingImage(true);
    try {
      // Use the reusable imageUpload function
      const imageData = await imageUpload(file);
      const secureUrl = imageData.url;

      // Update user via Better Auth
      await authClient.updateUser({ image: secureUrl });

      // Update local state
      setAvatarUrl(secureUrl);
      toast.success("Profile picture updated!");
      router.refresh();
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Name Change via Better Auth
  const handleSaveName = async () => {
    if (!name.trim()) return toast.error("Name cannot be blank.");

    setLoading(true);
    try {
      await authClient.updateUser({ name: name.trim() });
      toast.success("Name updated successfully!");
      router.refresh();
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center mt-10">
      {/* Avatar Image Frame */}
      <div
        className={`relative group w-28 h-28 rounded-full mb-4 ring-4 ring-[var(--primary-container)] overflow-hidden bg-[var(--surface-container-low)] flex items-center justify-center ${
          uploadingImage ? "animate-pulse" : ""
        }`}
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} fill className="object-cover" priority />
        ) : (
          <Person className="text-4xl text-[var(--outline)]" />
        )}
        <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs">
          <Camera className="text-lg mb-0.5" />
          <span>{uploadingImage ? "..." : "Change"}</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            disabled={uploadingImage}
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Identity Summary Header */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-xl font-bold text-[var(--on-surface)]">{name || "User Profile"}</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1 hover:bg-[var(--surface-container)] rounded-full text-[var(--primary)] transition-colors"
          title="Edit Profile Name"
        >
          <PencilToSquare className="text-lg" />
        </button>
      </div>
      <p className="text-sm text-[var(--on-surface-variant)] mb-4">{user?.email}</p>

      {/* Role Badge */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
          currentRole?.color || "border-[var(--border)]"
        }`}
      >
        <ShieldCheck className="text-base" />
        <span>{currentRole?.label || "User Access"}</span>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="bg-[var(--surface)] border border-[var(--outline-variant)] text-[var(--on-surface)]">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />

              <Modal.Header>
                <Modal.Heading className="text-lg font-bold">Edit Profile Info</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="space-y-4">
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="bordered"
                  className="w-full"
                />
                <Input
                  label="Email Address"
                  labelPlacement="outside"
                  value={user?.email || ""}
                  disabled
                  variant="bordered"
                  className="w-full opacity-60 cursor-not-allowed"
                />
              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-2">
                <Button
                  variant="light"
                  className="text-[var(--on-surface-variant)]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  className="bg-[var(--primary)] text-white font-semibold rounded-xl flex items-center gap-2"
                  onClick={handleSaveName}
                >
                  {!loading && <BiSave className="text-lg" />}
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}