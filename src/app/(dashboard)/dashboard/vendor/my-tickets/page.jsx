import MyTicketCard from "@/components/tickets/MyTicketCard";
import { getTickets } from "@/lib/api/tickets";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const myTicketsPage = async () => {
  const user = await getUserSession();
  const emailId = user?.email;
  const Tickets = await getTickets(emailId);

  return (
    <div>
      <div>
        <h1 className=" text-black dark:text-purple-700 font-bold text-4xl  drop-shadow-2xl">
          My Added Tickets
        </h1>
        <p className=" text-black dark:text-[#cfc2d6]">
          Manage and track your active inventory listings.
        </p>
        <p className="mb-4 text-2xl text-black dark:text-[#cfc2d6]">
         Total: <span>{Tickets.length}</span>
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Tickets.map((ticket) => (
          <MyTicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default myTicketsPage;
