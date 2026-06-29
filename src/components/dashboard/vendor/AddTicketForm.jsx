"use client";

import { useState } from "react";
import { Input, Button, Select, ListBox } from "@heroui/react";
import { BiPaperPlane } from "react-icons/bi";
import toast from "react-hot-toast";
import { imageUpload } from "@/lib/action/imgUpload";
import { BsArrowLeftRight, BsTrash2 } from "react-icons/bs";
import { Plus } from "@gravity-ui/icons";
import { FiUploadCloud } from "react-icons/fi";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { addTicket } from "@/lib/action/tickets";
import { redirect } from "next/navigation";

export default function AddTicketForm() {
  const { data: session } = authClient.useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [ticketImageUrl, setTicketImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [perks, setPerks] = useState(["AC", "WiFi"]);
  const [newPerkInput, setNewPerkInput] = useState("");
  const [showPerkInput, setShowPerkInput] = useState(false);

  const [transportType, setTransportType] = useState("Bus");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ticket image must be smaller than 2MB.");
      return;
    }

    setUploadingImage(true);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(1) + " MB");

    try {
      const imgbbData = await imageUpload(file);
      if (imgbbData && imgbbData.url) {
        setTicketImageUrl(imgbbData.url);
        toast.success("Ticket image uploaded successfully!");
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to host file via ImgBB helper utility.");
      setFileName("");
      setFileSize("");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeUploadedFile = () => {
    setTicketImageUrl("");
    setFileName("");
    setFileSize("");
  };

  const handleAddPerk = (e) => {
    e.preventDefault();
    if (newPerkInput.trim() && !perks.includes(newPerkInput.trim())) {
      setPerks([...perks, newPerkInput.trim()]);
      setNewPerkInput("");
      setShowPerkInput(false);
    }
  };

  const removePerk = (perkToRemove) => {
    setPerks(perks.filter((perk) => perk !== perkToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketImageUrl) {
      return toast.error(
        "Please select and upload a valid asset ticket image first.",
      );
    }

    setLoading(true);
    const form = e.currentTarget;
    const rawData = Object.fromEntries(new FormData(form));

    const payload = {
      title: rawData.ticketTitle,
      pricePerSeat: Number(rawData.pricePerSeat),
      quantityAvailable: Number(rawData.quantityAvailable),
      transportType: rawData.transportType,
      route: {
        from: rawData.departureCity,
        to: rawData.destinationCity,
      },
      schedule: {
        date: rawData.departureDate,
        time: rawData.departureTime,
      },
      perks: perks,
      imageUrl: ticketImageUrl,
      vendor: {
        name: name,
        email: email,
      },
      status: "pending",
    };
  
    // ... API call remains commented out ...
    const result=await addTicket(payload);
    if(result?.success){
      toast.success("Ticket submitted for approval successfully!");
      redirect("/dashboard/vendor/my-tickets");
    
    }
else{
  toast.error(result?.message || "Failed to submit ticket for approval.");
}


  };

  return (
    <div className="min-h-screen bg-background text-on-surface p-4 sm:p-6 md:p-12 font-sans selection:bg-primary-container selection:text-on-surface">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Add New Ticket
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 px-3 py-1.5 rounded-full text-xs font-medium self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Admin Review Pending
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-surface border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-8 shadow-custom"
      >
        <input type="hidden" name="transportType" value={transportType} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 md:space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  Ticket Title
                </label>
                <Input
                  required
                  name="ticketTitle"
                  placeholder="e.g. Dhaka to Sylhet Premium Express"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  Price per Seat
                </label>
                <Input
                  required
                  name="pricePerSeat"
                  type="number"
                  step="0.01"
                  placeholder="$ 0.00"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  Quantity Available
                </label>
                <Input
                  required
                  name="quantityAvailable"
                  type="number"
                  placeholder="40"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
            </div>

            {/* Transport Type */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="transport-type-select"
                className="text-on-surface-variant font-medium text-sm mb-1"
              >
                Transport Type
              </label>
              <div className="relative">
                <Select
                  id="transport-type-select"
                  value={transportType}
                  onChange={(value) => setTransportType(value)}
                  placeholder="Select transport"
                >
                  <Select.Trigger className="w-full h-12 bg-surface-container-low border border-border rounded-xl px-3 text-on-surface text-sm outline-none hover:border-outline-variant focus-within:!border-primary transition-colors flex justify-between items-center">
                    <Select.Value>
                      {transportType || "Select transport"}
                    </Select.Value>
                    <Select.Indicator>
                      <IoChevronDownCircleOutline className="w-4 h-4 text-on-surface-variant opacity-70" />
                    </Select.Indicator>
                  </Select.Trigger>

                  <Select.Popover className="bg-surface border border-border rounded-xl shadow-custom mt-1 overflow-hidden">
                    <ListBox className="text-on-surface p-1">
                      <ListBox.Item
                        id="Bus"
                        textValue="Bus"
                        className="hover:bg-surface-container rounded-lg px-3 py-2 cursor-pointer transition-colors"
                      >
                        <span className="text-sm">Bus</span>
                      </ListBox.Item>
                      <ListBox.Item
                        id="Train"
                        textValue="Train"
                        className="hover:bg-surface-container rounded-lg px-3 py-2 cursor-pointer transition-colors"
                      >
                        <span className="text-sm">Train</span>
                      </ListBox.Item>
                      <ListBox.Item
                        id="Flight"
                        textValue="Flight"
                        className="hover:bg-surface-container rounded-lg px-3 py-2 cursor-pointer transition-colors"
                      >
                        <span className="text-sm">Flight</span>
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Route */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  From
                </label>
                <Input
                  required
                  name="departureCity"
                  placeholder="Departure City"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
              <div className="flex justify-center md:col-span-1 py-1">
                <Button
                  isIconOnly
                  type="button"
                  className="bg-[var(--surface-container)] border border-[var(--outline-variant)] hover:bg-surface-container-low text-primary transition-colors rounded-xl h-12 w-12 rotate-90 md:rotate-0"
                >
                  <BsArrowLeftRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  To
                </label>
                <Input
                  required
                  name="destinationCity"
                  placeholder="Destination City"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  Departure Date
                </label>
                <Input
                  required
                  name="departureDate"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12 data-[has-value=false]:text-on-surface-variant"
                  variant="bordered"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium text-sm mb-1">
                  Departure Time
                </label>
                <Input
                  required
                  name="departureTime"
                  type="time"
                  placeholder="--:-- --"
                  className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                  variant="bordered"
                />
              </div>
            </div>

            {/* Perks */}
            <div className="space-y-2">
              <label className="text-on-surface-variant font-medium text-sm block">
                Perks & Amenities
              </label>
              <div className="flex flex-wrap gap-2 items-center min-h-[48px] p-2 bg-surface-container-low rounded-xl border border-border">
                {perks.map((perk) => (
                  <div
                    key={perk}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary dark:text-primary-container rounded-full text-xs font-semibold group transition-all"
                  >
                    <span>{perk}</span>
                    <button
                      type="button"
                      onClick={() => removePerk(perk)}
                      className="hover:text-red-500 font-bold focus:outline-none ml-0.5 text-xs transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {showPerkInput ? (
                  <div className="flex items-center gap-1 border border-outline-variant bg-surface rounded-xl overflow-hidden px-2 h-8">
                    <input
                      autoFocus
                      type="text"
                      value={newPerkInput}
                      onChange={(e) => setNewPerkInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddPerk(e)}
                      className="bg-transparent text-xs text-on-surface outline-none w-20"
                      placeholder="Press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddPerk}
                      className="text-primary text-xs font-bold hover:text-on-surface"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPerkInput(true)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-outline text-on-surface-variant hover:text-primary hover:border-primary transition-colors rounded-full text-xs font-medium"
                  >
                    <Plus className="w-3 h-3" /> Add Perk
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-5 md:space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-on-surface-variant font-medium text-sm block">
                  Ticket Image
                </label>
                <div className="relative border-2 border-dashed border-border hover:border-outline transition-colors rounded-2xl bg-surface-container-low p-6 flex flex-col items-center justify-center min-h-[200px] text-center group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    disabled={uploadingImage}
                  />

                  <FiUploadCloud className="w-10 h-10 text-primary mb-3 group-hover:scale-105 transition-transform" />
                  <p className="text-sm font-semibold text-on-surface">
                    Drag & drop or{" "}
                    <span className="text-primary group-hover:underline">
                      click to upload
                    </span>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    SVG, PNG, JPG (max 2MB)
                  </p>

                  {fileName && (
                    <div className="absolute inset-x-4 bottom-4 bg-surface border border-border rounded-xl p-3 flex items-center justify-between gap-3 z-20 shadow-custom animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-surface-container border border-border rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          {ticketImageUrl ? (
                            <Image
                              src={ticketImageUrl}
                              alt="Preview"
                              height={50}
                              width={50}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                          )}
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="text-xs font-medium text-on-surface truncate max-w-[140px] sm:max-w-[160px]">
                            {fileName}
                          </p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">
                            {uploadingImage ? `Uploading...` : fileSize}
                          </p>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        type="button"
                        onClick={removeUploadedFile}
                        className="bg-transparent hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 min-w-0 w-8 h-8 rounded-lg"
                      >
                        <BsTrash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant font-medium text-sm mb-1">
                    Vendor Name
                  </label>
                  <Input
                    required
                    defaultValue={name}
                    disabled
                    placeholder="Alex's Travel Agency"
                    className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                    variant="bordered"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface-variant font-medium text-sm mb-1">
                    Vendor Email
                  </label>
                  <Input
                    required
                    defaultValue={email}
                    type="email"
                    disabled
                    className="bg-surface-container-low border-border hover:border-outline-variant focus-within:!border-primary text-on-surface h-12"
                    variant="bordered"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 lg:pt-0">
              <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3 mb-4 text-left">
                <span className="text-blue-500 text-base select-none mt-0.5">
                  ℹ
                </span>
                <div className="flex-1">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    This ticket will be reviewed by an admin before going live
                    in the marketplace. Usually takes 2-4 hours.
                  </p>
                </div>
                <span className="text-[10px] tracking-wider text-blue-500/70 font-bold select-none pt-0.5">
                  PENDING
                </span>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                disabled={uploadingImage}
                className="w-full bg-purple-700 font-bold text-sm h-14 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
              >
                {!loading && (
                  <BiPaperPlane className="text-lg rotate-45 mb-0.5" />
                )}
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}