import React from "react";
import TicketCard from "../tickets/TicketCard";
import { demoTickets } from "./FeaturedTicketsSection";

const LatestTicketsSection = () => {
  return (
    <div>
      <div className="text-center mt-30 mb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-[var(--primary)] via-[var(--primary-container)] to-[var(--tertiary)] bg-clip-text text-transparent drop-shadow-2xl ">Latest Tickets</h1>
        <h2 className=" font-medium mt-4">
          Be the first to book our latest tickets and enjoy smooth journeys with
          <br /> reliable bus services.
        </h2>
      </div>
      <div className="grid  max-w-7xl mx-auto mt-10 md:grid-cols-2   lg:grid-cols-3 gap-6">
        {demoTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default LatestTicketsSection;
