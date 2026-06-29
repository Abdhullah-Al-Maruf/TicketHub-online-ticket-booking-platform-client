"use client";
import RequestedTicketBookingsTable from "@/components/dashboard/admin/RequestedTicketBookingsTable";
import TopHeading from "@/components/dashboard/admin/TopHeading";
import React, { useState } from "react";

const ManageTicketsPage = ({ initialBookings }) => {
  // for filter tab
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter the array client-side when a user clicks a tab
  const filteredBookings = initialBookings.filter((booking) => {
    if (filterStatus === "all") return true;

    return booking.status?.toLowerCase() === filterStatus;
  });
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Receives the interactive filter state config */}
        <TopHeading
          activeFilter={filterStatus}
          onFilterChange={setFilterStatus}
        />

        {/* Receives the filtered data down layout */}
        <RequestedTicketBookingsTable bookings={filteredBookings} />
      </div>
    </div>
  );
};

export default ManageTicketsPage;
