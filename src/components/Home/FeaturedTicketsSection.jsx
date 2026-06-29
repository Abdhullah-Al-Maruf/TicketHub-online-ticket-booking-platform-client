import React from "react";
import TicketCard from "../tickets/TicketCard";
import { getAdvertisedTickets } from "@/lib/api/public-api-data";

const FeaturedTicketsSection =async () => {
  const Tickets= await getAdvertisedTickets()
  return (
    <div className="text-center mt-30 mb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-[var(--primary)] via-[var(--primary-container)] to-[var(--tertiary)] bg-clip-text text-transparent drop-shadow-2xl">Featured Tickets</h1>
        <h2>Choose your route, pick your seat, and travel stress-free with fast booking, trusted operators, and real-time updates</h2>
      <div className="grid  max-w-7xl mx-auto mt-10 md:grid-cols-2   lg:grid-cols-3 gap-6">
        {Tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTicketsSection;
