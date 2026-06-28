"use client";

import { Card, Button } from "@heroui/react";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Image from "next/image";
import { useState } from "react";
import DeleteTicketModal from "../dashboard/vendor/DeleteTicketModal";
import UpdateTicketModal from "../dashboard/vendor/UpdateTicketModal";

export default function MyTicketCard({ ticket }) {
  const currentTicket = ticket;

  // State controller variable to handle the open/close state of the delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const getTransportIcon = () => {
    const type = currentTicket?.transportType?.toLowerCase();

    switch (type) {
      case "bus":
        return <FaBus />;
      case "train":
        return <FaTrain />;
      case "launch":
      case "ship":
        return <FaShip />;
      case "flight":
        return <FaPlane />;
      default:
        return null;
    }
  };

  const displayDate = currentTicket?.schedule?.date || "N/A";
  const displayTime = currentTicket?.schedule?.time || "N/A";

  const seats = currentTicket?.quantityAvailable ?? 0;
  const perks = currentTicket?.perks || [];

  const isLowStock = seats <= 5;

  const seatsBadgeClass = isLowStock
    ? "bg-red-500/20 border-red-500/40 text-red-500"
    : "bg-green-500/20 border-green-500/40 text-green-500";

  const status = currentTicket?.status?.toLowerCase() || "pending";

  const statusConfig = {
    approved: {
      icon: <FaCheckCircle />,
      textClass: "text-green-400 border border-green-500/30 bg-green-500/10",
    },
    pending: {
      icon: <FaHourglassHalf />,
      textClass: "text-amber-400 border border-amber-500/30 bg-amber-500/10",
    },
    rejected: {
      icon: <FaTimesCircle />,
      textClass: "text-red-400 border border-red-500/30 bg-red-500/10",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  return (
    <>
      <Card
        className="bg-[var(--surface-container)] border border-[var(--outline-variant)] overflow-hidden h-full flex flex-col rounded-xl text-left"
        radius="lg"
      >
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={currentTicket?.imageUrl}
            alt={currentTicket?.title || "Ticket banner"}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <span className="absolute top-3 left-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
            {getTransportIcon()}
            {currentTicket?.transportType}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 space-y-4">
          <h3 className="text-xl font-bold line-clamp-1">
            {currentTicket?.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-[var(--on-surface-variant)]">
            <FaMapMarkerAlt className="text-[var(--primary)]" />
            <span>
              {currentTicket?.route?.from} → {currentTicket?.route?.to}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm text-[var(--on-surface-variant)]">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[var(--primary)]" />
                <span>{displayDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-[var(--primary)]" />
                <span>{displayTime}</span>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${currentStatus.textClass}`}
            >
              {currentStatus.icon}
              <span className="capitalize">{status}</span>
            </div>
          </div>

          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-medium mb-2">Included Perks</p>

              <div className="flex flex-wrap gap-2">
                {perks.map((perk, index) => (
                  <span
                    key={index}
                    className="text-[10px] px-2 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`px-3 py-2 rounded-lg border text-xs font-semibold ${seatsBadgeClass}`}
            >
              {seats} seats left
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--outline-variant)] p-5 bg-[var(--surface-container-low)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-[var(--primary)]">
                ৳{currentTicket?.pricePerSeat}
              </span>
              <span className="ml-2 text-sm text-[var(--on-surface-variant)]">
                per ticket
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              isIconOnly
              className="bg-white/5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-400 border border-[var(--outline-variant)]"
              onPress={() => setIsUpdateOpen(true)}
            >
              <HiOutlinePencil className="text-lg" />
            </Button>

            {/* Click sets state true to trigger our component modal rendering wrapper */}
            <Button
              isIconOnly
              className="bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-[var(--outline-variant)]"
              onPress={() => setIsDeleteOpen(true)}
            >
              <HiOutlineTrash className="text-lg" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Renders safely outside the main layout container box */}

      <UpdateTicketModal
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        ticket={currentTicket} // Pass down the complete ticket data payload object
      />

      <DeleteTicketModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        id={currentTicket?._id || currentTicket?.id}
      />
    </>
  );
}
