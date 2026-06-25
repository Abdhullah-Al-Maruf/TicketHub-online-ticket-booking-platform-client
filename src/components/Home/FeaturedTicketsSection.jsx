import React from "react";
import TicketCard from "../tickets/TicketCard";

export const demoTickets = [
  {
    _id: "1",
    title: "Dhaka to Chittagong Express",
    from: "Dhaka",
    to: "Chittagong",
    transportType: "Bus",
    price: 850,
    quantity: 28,
    departureDateTime: "2026-06-30T21:55:00Z",
    perks: ["AC", "Food", "WiFi"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    vendorId: "vendor1",
    vendorName: "Green Line Paribahan",
    verificationStatus: "approved",
  },
  {
    _id: "2",
    title: "Dhaka to Cox's Bazar Super AC",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "Bus",
    price: 1200,
    quantity: 15,
    departureDateTime: "2026-07-05T22:00:00Z",
    perks: ["AC", "Sleeping Berth", "Food", "Entertainment"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
    vendorId: "vendor2",
    vendorName: "Shohag Paribahan",
    verificationStatus: "approved",
  },
  {
    _id: "3",
    title: "Dhaka to Sylhet Intercity",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "Train",
    price: 650,
    quantity: 2,
    departureDateTime: "2026-07-10T08:30:00Z",
    perks: ["AC", "Meal", "WiFi"],
    image: "https://images.unsplash.com/photo-1474487548417-781cb714c22d?w=800",
    vendorId: "vendor3",
    vendorName: "Bangladesh Railway",
    verificationStatus: "approved",
  },
];

const FeaturedTicketsSection = () => {
  return (
    <div className="text-center mt-30 mb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-[var(--primary)] via-[var(--primary-container)] to-[var(--tertiary)] bg-clip-text text-transparent drop-shadow-2xl">Featured Tickets</h1>
        <h2>Choose your route, pick your seat, and travel stress-free with fast booking, trusted operators, and real-time updates</h2>
      <div className="grid  max-w-7xl mx-auto mt-10 md:grid-cols-2   lg:grid-cols-3 gap-6">
        {demoTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTicketsSection;
