"use client";

import { Button, Spinner } from "@heroui/react";
import BookingCard from "./BookingCard";


export default function BookingList({ bookings, error }) {
  if (error) {
    return (
      <div className="text-center text-red-400 py-10">
        <p>{error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-[var(--on-surface)]">No bookings yet</h2>
        <p className="text-[var(--on-surface-variant)]">Start exploring tickets and book your next trip!</p>
        <Button href="/all-tickets" className="mt-4 bg-purple-600 text-white">
          Browse Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}