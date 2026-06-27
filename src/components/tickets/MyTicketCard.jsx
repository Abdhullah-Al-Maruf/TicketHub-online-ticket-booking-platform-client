"use client";
import Link from "next/link";
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

//  update the component
export default function MyTicketCard({ ticket, onUpdate, onDelete }) {
  // const currentTicket = ticket;
  const currentTicket = {
    title: "express",
    pricePerSeat: 33,
    quantityAvailable: 33,
    transportType: "Bus",
    route: {
      from: "feni",
      to: "chhagalnaiya",
    },
    schedule: {
      date: "2026-06-05",
      time: "11:39",
    },
    perks: ["AC", "WiFi"],
    imageUrl: "https://i.ibb.co/FbftwKLb/1st-img.png",
    vendor: {
      name: "Sumon boro Bai",
      email: "sumon@gmail.com",
    },
    status: "pending",
  };

  const getTransportIcon = () => {
    const type = currentTicket.transportType?.toLowerCase();
    if (type === "bus") return <FaBus />;
    if (type === "train") return <FaTrain />;
    if (type === "launch" || type === "ship") return <FaShip />;
    if (type === "flight") return <FaPlane />;
    return null;
  };

  const displayDate = currentTicket.schedule?.date;
  const displayTime = currentTicket.schedule?.time;

  // Determine badge color based on seat availability
  const isLowStock = (currentTicket.quantityAvailable ?? 0) <= 5;
  const seatsBadgeClass = isLowStock
    ? "bg-[#ef4444]/20 border-[#ef4444]/40 text-[#ef4444]"
    : "bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]";

  // Verification Status Badge Configurations
  const status = currentTicket.status?.toLowerCase() || "pending";
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
    <Card
      className="bg-[var(--surface-container)] border border-[var(--outline-variant)] overflow-hidden h-full flex flex-col rounded-xl text-left"
      radius="lg"
    >
      {/* 1. Image Section */}
      <div className="relative h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={currentTicket.imageUrl}
          alt={currentTicket.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Transport Type Badge */}
        <span className="absolute top-3 left-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
          {getTransportIcon()}
          {currentTicket.transportType}
        </span>
      </div>

      {/* 2. Content Section */}
      <div className="p-5 flex-grow space-y-4">
        <h3 className="text-xl font-bold text-[var(--on-surface)] line-clamp-1">
          {currentTicket.title}
        </h3>

        <div className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm">
          <FaMapMarkerAlt className="text-[var(--primary)]" />
          <span className="font-medium capitalize">
            {currentTicket.route?.from} → {currentTicket.route?.to}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 text-[var(--on-surface-variant)] text-sm">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[var(--primary)]" />
              <span>{displayDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaClock className="text-[var(--primary)]" />
              <span>{displayTime}</span>
            </div>
          </div>

          {/* Status Verification Badge Layout */}
          <div
            className={` flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm ${currentStatus.textClass}`}
          >
            {currentStatus.icon}
            <span className="capitalize">{status}</span>
          </div>
        </div>

        {/* Perks + Available Seats in same row */}
        <div className="flex items-start justify-between gap-2 pt-2">
          <div className="space-y-2">
            <p className="text-xs font-medium flex justify-start">
              Included Perks:
            </p>
            <div className="flex flex-wrap gap-2">
              {currentTicket.perks?.map((perk, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2 py-1 rounded-full"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Seats Left */}
          <div
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg border border-[var(--outline-variant)] shrink-0 ${seatsBadgeClass}`}
          >
            <span className="text-xs font-bold ">
              {currentTicket.quantityAvailable} seats left
            </span>
          </div>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="p-5 border-t border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[var(--primary)]">
            ৳{currentTicket.pricePerSeat}
          </span>
          <span className="text-[var(--on-surface-variant)] text-sm">
            per ticket
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          {/* Operation Action Buttons (Update & Delete Icon Wrappers) */}
          <Button
            isIconOnly
            className="bg-white/5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-400 rounded-lg w-10 h-10 border border-[var(--outline-variant)]"
            onPress={() => onUpdate?.(currentTicket.id || currentTicket._id)}
          >
            <HiOutlinePencil className="text-base" />
          </Button>
          <Button
            isIconOnly
            className="bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg w-10 h-10 border border-[var(--outline-variant)]"
            onPress={() => onDelete?.(currentTicket.id || currentTicket._id)}
          >
            <HiOutlineTrash className="text-base" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
