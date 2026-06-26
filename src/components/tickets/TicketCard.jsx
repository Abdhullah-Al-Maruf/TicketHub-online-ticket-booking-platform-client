import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaBus, FaTrain, FaShip, FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";
import Image from "next/image";

export default function TicketCard({ ticket }) {
  const currentTicket = ticket;

  const getTransportIcon = () => {
    const type = currentTicket.transportType?.toLowerCase();
    if (type === "bus") return <FaBus />;
    if (type === "train") return <FaTrain />;
    if (type === "launch") return <FaShip />;
    if (type === "flight") return <FaPlane />;
    return null;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "", time: "" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };
  };

  const { date, time } = formatDateTime(currentTicket.departureDateTime);


  // Determine badge color based on seat availability
  const isLowStock = currentTicket.quantity <= 5;
  const seatsBadgeClass = isLowStock
    ?"bg-[#ef4444]/20 border-[#ef4444]/40 text-[#ef4444]"
    : "bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]";


  return (
    <Card className="bg-[var(--surface-container)] border border-[var(--outline-variant)] overflow-hidden h-full flex flex-col rounded-xl" radius="lg">
      
      {/* 1. Image Section: Now fits perfectly with rounded-t-lg */}
      <div className="relative h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={currentTicket.image}
          alt={currentTicket.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[] to-transparent" />
        
        {/* Transport Type Badge */}
        <span className="absolute top-3 left-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
          {getTransportIcon()}
          {currentTicket.transportType}
        </span>
      </div>

      {/* 2. Content Section */}
      <div className="p-5 flex-grow space-y-4">
        <h3 className="text-xl font-bold text-[var(--on-surface)] line-clamp-1">{currentTicket.title}</h3>

        <div className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm">
          <FaMapMarkerAlt className="text-[var(--primary)]" />
          <span className="font-medium">{currentTicket.from} → {currentTicket.to}</span>
        </div>

        <div className="flex items-center gap-4 text-[var(--on-surface-variant)] text-sm">
          <div className="flex items-center gap-1.5"><FaCalendarAlt className="text-[var(--primary)]" /><span>{date}</span></div>
          <div className="flex items-center gap-1.5"><FaClock className="text-[var(--primary)]" /><span>{time}</span></div>
        </div>

        {/* Perks + Available Seats in same row */}
        <div className="flex items-start justify-between gap-2 pt-2">
          <div className="space-y-2">
            <p className="text-xs font-medium flex justify-start">Included Perks:</p>
            <div className="flex flex-wrap gap-2">
              {currentTicket.perks?.map((perk, i) => (
                <span key={i} className="text-[10px] font-medium text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2 py-1 rounded-full">{perk}</span>
              ))}
            </div>
          </div>
          
          {/* Seats Left moved here */}
          <div className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg border border-[var(--outline-variant)] shrink-0 ${seatsBadgeClass}`}>
           
            <span className="text-xs font-bold ">{currentTicket.quantity}  seats left</span>
          </div>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="p-5 border-t border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[var(--primary)]">৳{currentTicket.price}</span>
          <span className="text-[var(--on-surface-variant)] text-sm">per ticket</span>
        </div>
        <Link href={`/tickets/${currentTicket._id}`}>
          <Button className="w-full  bg-gradient-to-r from-[#f3a] to-[#b76dff] text-[var(--on-primary)] font-bold py-2.5 rounded-lg">
            See Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}