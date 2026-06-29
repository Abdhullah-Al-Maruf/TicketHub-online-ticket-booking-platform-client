// app/(public)/tickets/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Button } from "@heroui/react";
import {
  FaBus, FaTrain, FaShip, FaPlane,
  FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser,
  FaCheckCircle
} from "react-icons/fa";

import TicketDetailsClient from "./TicketDetailsClient";
import { getTicketById } from "@/lib/api/tickets";


export default async function TicketDetailsPage({ params }) {
  const { id } = await params;
console.log(id);
  // Fetch ticket
  let ticket = null;
  try {
    ticket = await getTicketById(id);
  } catch (error) {
    console.error("Failed to fetch ticket:", error);
  }

  if (!ticket) notFound();

  // ─── Helpers ──────────────────────────────────────────────
  const getTransportIcon = (type) => {
    const t = type?.toLowerCase();
    if (t === "bus") return <FaBus className="text-lg" />;
    if (t === "train") return <FaTrain className="text-lg" />;
    if (t === "launch") return <FaShip className="text-lg" />;
    if (t === "flight") return <FaPlane className="text-lg" />;
    return null;
  };

  const getTransportColor = (type) => {
    const t = type?.toLowerCase();
    if (t === "bus") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (t === "train") return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    if (t === "launch") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    if (t === "flight") return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    if (timeStr.includes(":")) return timeStr;
    const d = new Date(timeStr);
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const from = ticket.route?.from || "N/A";
  const to = ticket.route?.to || "N/A";
  const date = ticket.schedule?.date ? formatDate(ticket.schedule.date) : "";
  const time = ticket.schedule?.time ? formatTime(ticket.schedule.time) : "";
  const quantityAvailable = ticket.quantityAvailable || 0;
  const price = ticket.pricePerSeat || 0;
  const perks = ticket.perks || [];
  const imageUrl = ticket.imageUrl?.startsWith("http") ? ticket.imageUrl : "/placeholder-ticket.jpg";

  // ─── Departure check ──────────────────────────────────────
  const getDepartureDateTime = () => {
    if (!ticket.schedule?.date || !ticket.schedule?.time) return null;
    const [year, month, day] = ticket.schedule.date.split("-").map(Number);
    const [hours, minutes] = ticket.schedule.time.split(":").map(Number);
    return new Date(year, month - 1, day, hours || 0, minutes || 0);
  };

  const departureDateTime = getDepartureDateTime();
  const isDeparted = departureDateTime ? new Date() > departureDateTime : false;

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/all-tickets" className="inline-block mb-6">
          <Button variant="light" className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]">
            ← Back to all tickets
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-2xl overflow-hidden">
              <div className="relative w-full h-72 md:h-96">
                <Image src={imageUrl} alt={ticket.title || "Ticket"} fill className="object-cover" />
                <div className={`absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl border ${getTransportColor(ticket.transportType)}`}>
                  {getTransportIcon(ticket.transportType)}
                  <span className="font-bold text-sm">{ticket.transportType || "Transport"}</span>
                </div>
                {ticket.status === "approved" && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <FaCheckCircle className="text-[10px]" /> Verified Vendor
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--on-surface)]">{ticket.title || "Untitled Ticket"}</h1>
              <div className="flex items-center gap-2 text-[var(--on-surface-variant)]">
                <FaMapMarkerAlt className="text-[var(--primary)]" />
                <span className="font-medium text-base">{from} → {to}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--on-surface-variant)]">
                <div className="flex items-center gap-1.5"><FaCalendarAlt className="text-[var(--primary)]" /><span>{date}</span></div>
                <div className="flex items-center gap-1.5"><FaClock className="text-[var(--primary)]" /><span>{time}</span></div>
                <div className="flex items-center gap-1.5"><FaUser className="text-[var(--primary)]" /><span>{ticket.vendor?.name || "Unknown Vendor"}</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider">Perks & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {perks.length > 0 ? (
                  perks.map((perk, i) => (
                    <span key={i} className="text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-3 py-1.5 rounded-full">{perk}</span>
                  ))
                ) : (
                  <span className="text-sm text-[var(--on-surface-variant)]">No perks listed</span>
                )}
              </div>
            </div>
          </div>

          {/* Right column – booking card */}
          <div className="lg:col-span-1">
            <Card className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-2xl p-6 sticky top-6 space-y-6">
              <div><span className="text-3xl font-bold text-[var(--primary)]">৳{price}</span><span className="text-sm text-[var(--on-surface-variant)] ml-2">per seat</span></div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--on-surface-variant)]">Availability</span>
                  {quantityAvailable > 0 ? (
                    <span className={`text-sm font-bold ${quantityAvailable <= 5 ? "text-red-400" : "text-green-400"}`}>{quantityAvailable} of {quantityAvailable} seats left</span>
                  ) : (
                    <span className="text-sm font-bold text-red-400">Sold Out</span>
                  )}
                </div>
                {quantityAvailable > 0 && (
                  <div className="w-full h-1.5 bg-[var(--surface-container-low)] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${quantityAvailable <= 5 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${Math.min((quantityAvailable / 40) * 100, 100)}%` }} />
                  </div>
                )}
              </div>

              <div className="bg-[var(--surface-container-low)] rounded-xl p-4 border border-[var(--outline-variant)]">
                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">{isDeparted ? "Trip has departed" : "Departure in"}</p>
                <TicketDetailsClient departureDateTime={departureDateTime?.toISOString()} isDeparted={isDeparted} />
              </div>

              <TicketDetailsClient
                ticketId={ticket._id}
                quantityAvailable={quantityAvailable}
                isDeparted={isDeparted}
                price={price}
                title={ticket.title}
                from={from}
                to={to}
                date={date}
                time={time}
                isButton
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}