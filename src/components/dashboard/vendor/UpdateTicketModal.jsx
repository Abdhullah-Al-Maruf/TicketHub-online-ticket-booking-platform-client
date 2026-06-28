"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, ListBox } from "@heroui/react";
import { BsArrowLeftRight, BsTrash2 } from "react-icons/bs";
import { Plus } from "@gravity-ui/icons";
import { FiUploadCloud } from "react-icons/fi";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { HiOutlineArrowUpOnSquare } from "react-icons/hi2";
import Image from "next/image";
import toast from "react-hot-toast";
import { imageUpload } from "@/lib/action/imgUpload";
import { updateTicket } from "@/lib/action/tickets"; 

const UpdateTicketModal = ({ isUpdateOpen, setIsUpdateOpen, ticket }) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Prefilled states based on current ticket props
  const [ticketImageUrl, setTicketImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [perks, setPerks] = useState([]);
  const [newPerkInput, setNewPerkInput] = useState("");
  const [showPerkInput, setShowPerkInput] = useState(false);
  const [transportType, setTransportType] = useState("Bus");

  // Sync data whenever a new ticket is targeted for update
  useEffect(() => {
    if (ticket) {
      setTicketImageUrl(ticket.imageUrl || "");
      setPerks(ticket.perks || []);
      setTransportType(ticket.transportType || "Bus");
      setFileName(ticket.imageUrl ? "Current Asset Image" : "");
      setFileSize("");
    }
  }, [ticket, isUpdateOpen]);

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
      if (imgbbData?.url) {
        setTicketImageUrl(imgbbData.url);
        toast.success("New ticket image uploaded successfully!");
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
      return toast.error("Please select and upload a valid asset ticket image first.");
    }

    setLoading(true);
    const form = e.currentTarget;
    const rawData = Object.fromEntries(new FormData(form));

    const payload = {
      title: rawData.ticketTitle,
      pricePerSeat: Number(rawData.pricePerSeat),
      quantityAvailable: Number(rawData.quantityAvailable),
      transportType: transportType,
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
    };

    try {
      const result = await updateTicket(ticket?._id || ticket?.id, payload);
      if (result?.success) {
        toast.success("Ticket listing updated successfully!");
        setIsUpdateOpen(false);
      } else {
        toast.error(result?.message || "Failed to update ticket details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
      <Modal.Backdrop className="bg-black/40 dark:bg-black/60 backdrop-blur-md">
        <Modal.Container>
          {/* Changed 'dark text-white bg-slate-950 border border-white/10' to adaptive classes */}
          <Modal.Dialog className="text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full max-w-4xl mx-auto my-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <Modal.CloseTrigger className="text-slate-400 hover:text-slate-600 dark:hover:text-white" />
            
            <Modal.Header>
              <Modal.Heading className="text-slate-900 dark:text-white font-bold text-2xl mb-4">
                Update Ticket Listing
              </Modal.Heading>
            </Modal.Header>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Side Inputs */}
                <div className="md:col-span-7 space-y-4">
                  
                  {/* Row 1: Title, Price, Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">Ticket Title</label>
                      <Input
                        required
                        name="ticketTitle"
                        defaultValue={ticket?.title}
                        placeholder="e.g. Dhaka to Sylhet Express"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11"
                        variant="bordered"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">Price / Seat</label>
                      <Input
                        required
                        name="pricePerSeat"
                        type="number"
                        step="0.01"
                        defaultValue={ticket?.pricePerSeat}
                        placeholder="৳ 0.00"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11"
                        variant="bordered"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">Quantity</label>
                      <Input
                        required
                        name="quantityAvailable"
                        type="number"
                        defaultValue={ticket?.quantityAvailable}
                        placeholder="40"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11"
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* Transport Type Selection */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="modal-transport-select" className="text-slate-500 dark:text-slate-400 font-medium text-xs">Transport Type</label>
                    <Select
                      id="modal-transport-select"
                      value={transportType}
                      onChange={(value) => setTransportType(value)}
                      placeholder="Select transport"
                    >
                      <Select.Trigger className="w-full h-11 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-slate-900 dark:text-white text-sm flex justify-between items-center outline-none">
                        <Select.Value>{transportType}</Select.Value>
                        <Select.Indicator>
                          <IoChevronDownCircleOutline className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl mt-1 overflow-hidden shadow-lg">
                        <ListBox className="text-slate-900 dark:text-white p-1">
                          {["Bus", "Train", "Flight", "Ship"].map((type) => (
                            <ListBox.Item
                              key={type}
                              id={type}
                              textValue={type}
                              className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-3 py-2 cursor-pointer transition-colors text-sm"
                            >
                              {type}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Route Setup */}
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-end">
                    <div className="sm:col-span-3 flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">From</label>
                      <Input
                        required
                        name="departureCity"
                        defaultValue={ticket?.route?.from}
                        placeholder="Departure City"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11"
                        variant="bordered"
                      />
                    </div>
                    <div className="flex justify-center sm:col-span-1 py-1">
                      <Button isIconOnly type="button" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-purple-600 dark:text-purple-400 rounded-xl h-11 w-11 rotate-90 sm:rotate-0">
                        <BsArrowLeftRight className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="sm:col-span-3 flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">To</label>
                      <Input
                        required
                        name="destinationCity"
                        defaultValue={ticket?.route?.to}
                        placeholder="Destination City"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11"
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">Departure Date</label>
                      <Input
                        required
                        name="departureDate"
                        type="date"
                        defaultValue={ticket?.schedule?.date}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11-[color-scheme:light] dark:[color-scheme:dark]"
                        variant="bordered"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 dark:text-slate-400 font-medium text-xs">Departure Time</label>
                      <Input
                        required
                        name="departureTime"
                        type="time"
                        defaultValue={ticket?.schedule?.time}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-11 [color-scheme:light] dark:[color-scheme:dark]"
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* Perks Dynamic Control */}
                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 font-medium text-xs block">Perks & Amenities</label>
                    <div className="flex flex-wrap gap-2 items-center min-h-[44px] p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10">
                      {perks.map((perk) => (
                        <div key={perk} className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                          <span>{perk}</span>
                          <button type="button" onClick={() => removePerk(perk)} className="hover:text-red-500 dark:hover:text-red-400 font-bold ml-1">×</button>
                        </div>
                      ))}

                      {showPerkInput ? (
                        <div className="flex items-center gap-1 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 rounded-xl overflow-hidden px-2 h-7">
                          <input
                            autoFocus
                            type="text"
                            value={newPerkInput}
                            onChange={(e) => setNewPerkInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddPerk(e)}
                            className="bg-transparent text-xs text-slate-900 dark:text-white outline-none w-20"
                            placeholder="Press Enter"
                          />
                          <button type="button" onClick={handleAddPerk} className="text-purple-600 dark:text-purple-400 text-xs font-bold">+</button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowPerkInput(true)}
                          className="flex items-center gap-1 px-2.5 py-1 border border-dashed border-slate-300 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-400 transition-colors rounded-full text-xs font-medium"
                        >
                          <Plus className="w-3 h-3" /> Add Perk
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Side Image Upload Preview Box */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-slate-500 dark:text-slate-400 font-medium text-xs block">Ticket Inventory Asset Image</label>
                    <div className="relative border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 flex flex-col items-center justify-center min-h-[220px] text-center group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        disabled={uploadingImage}
                      />

                      <FiUploadCloud className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-105 transition-transform" />
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Drag & drop or <span className="text-purple-600 dark:text-purple-400 group-hover:underline">click to upload alternative file</span>
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">PNG, JPG (max 2MB)</p>

                      {fileName && (
                        <div className="absolute inset-x-3 bottom-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 flex items-center justify-between gap-3 z-20 shadow-xl">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              {ticketImageUrl ? (
                                <Image src={ticketImageUrl} alt="Preview" height={40} width={40} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-500 animate-ping"></div>
                              )}
                            </div>
                            <div className="text-left overflow-hidden">
                              <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">{fileName}</p>
                              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{uploadingImage ? "Uploading..." : fileSize}</p>
                            </div>
                          </div>
                          <Button isIconOnly type="button" onClick={removeUploadedFile} className="bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 min-w-0 w-7 h-7 rounded-lg">
                            <BsTrash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Operations */}
                  <Modal.Footer className="flex justify-end gap-3 pt-6 md:pt-0">
                    <Button 
                      variant="light" 
                      className="text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10" 
                      onPress={() => setIsUpdateOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-purple-700 font-bold text-white shadow-lg flex items-center gap-2"
                      isLoading={loading}
                      disabled={uploadingImage}
                    >
                      {!loading && <HiOutlineArrowUpOnSquare className="text-base" />}
                      Save Changes
                    </Button>
                  </Modal.Footer>

                </div>

              </div>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateTicketModal;