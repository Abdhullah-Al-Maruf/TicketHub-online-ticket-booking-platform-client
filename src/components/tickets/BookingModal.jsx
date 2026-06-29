"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function TicketDetailsClient({
  ticketId,
  quantityAvailable,
  isDeparted,
  price,
  title,
  from,
  to,
  date,
  time,
  departureDateTime,
  isButton = false,
}) {
  const router = useRouter();

  // Countdown logic (unchanged)
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  useEffect(() => {
    if (!departureDateTime) return;
    const target = new Date(departureDateTime).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      if (diff === 0) {
        setIsCountdownComplete(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [departureDateTime]);

  // Countdown display (unchanged)
  if (!isButton) {
    const isExpired = isCountdownComplete || isDeparted;
    return (
      <div>
        {isExpired ? (
          <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
            <FaExclamationCircle />
            <span>Departed</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-white font-mono">
            <div className="text-center">
              <span className="text-xl font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-[8px] text-[var(--on-surface-variant)] block">Days</span>
            </div>
            <span className="text-[var(--on-surface-variant)] text-lg">:</span>
            <div className="text-center">
              <span className="text-xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-[8px] text-[var(--on-surface-variant)] block">Hrs</span>
            </div>
            <span className="text-[var(--on-surface-variant)] text-lg">:</span>
            <div className="text-center">
              <span className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-[8px] text-[var(--on-surface-variant)] block">Min</span>
            </div>
            <span className="text-[var(--on-surface-variant)] text-lg">:</span>
            <div className="text-center">
              <span className="text-xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-[8px] text-[var(--on-surface-variant)] block">Sec</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  const isDisabled = isDeparted || quantityAvailable <= 0;

  // Handle booking navigation – pass all needed data via URL query
  const handleBookNow = () => {
    const params = new URLSearchParams({
      ticketId,
      quantityAvailable,
      price,
      title,
      from,
      to,
      date,
      time,
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <>
      <Button
        onPress={handleBookNow}
        isDisabled={isDisabled}
        className={`w-full h-14 text-lg font-bold rounded-xl transition-all ${
          isDisabled
            ? "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {isDeparted ? "Departure Passed" : quantityAvailable <= 0 ? "Sold Out" : "Book Now"}
      </Button>

      {isDeparted && (
        <p className="text-xs text-red-400 text-center mt-2">This trip has already departed</p>
      )}
      {quantityAvailable <= 0 && !isDeparted && (
        <p className="text-xs text-red-400 text-center mt-2">All seats are sold out</p>
      )}
    </>
  );
}