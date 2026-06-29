"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { FaExclamationCircle, FaMinus, FaPlus } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // ─── Countdown ────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  // ─── Booking State ────────────────────────────────────────────
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isSoldOut = quantityAvailable <= 0;
  const maxQuantity = Math.min(quantityAvailable, 10);
  const totalPrice = quantity * price;

  const increment = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // ─── Handle Booking ───────────────────────────────────────────
  const handleBookNow = async () => {
    if (quantity <= 0 || quantity > quantityAvailable) {
      toast.error(`Please select between 1 and ${quantityAvailable} tickets`);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          quantity,
          totalPrice,
          ticketTitle: title,
          route: { from, to },
          schedule: { date, time },
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Booking request submitted successfully!");
        onClose();
        router.push("/my-bookings");
      } else {
        toast.error(data.message || "Failed to book ticket");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Render Countdown ─────────────────────────────────────────
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

  // ─── Render Book Now Button + Modal ──────────────────────────
  const isDisabled = isDeparted || isSoldOut;

  return (
    <>
      {/* ─── Book Now Button ────────────────────────────────────── */}
      <Button
        onPress={onOpen}
        isDisabled={isDisabled}
        className={`w-full h-14 text-lg font-bold rounded-xl transition-all ${
          isDisabled
            ? "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {isDeparted ? "Departure Passed" : isSoldOut ? "Sold Out" : "Book Now"}
      </Button>

      {isDeparted && (
        <p className="text-xs text-red-400 text-center mt-2">This trip has already departed</p>
      )}
      {isSoldOut && !isDeparted && (
        <p className="text-xs text-red-400 text-center mt-2">All seats are sold out</p>
      )}

      {/* ─── Simplified Modal ──────────────────────────────────── */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-2xl max-w-md w-full mx-auto p-0 relative">
            <Modal.CloseTrigger className="absolute top-4 right-4 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] z-10 text-lg" />
            <Modal.Header>
              <Modal.Heading className="text-[var(--on-surface)] text-xl font-bold">
                Booking Information
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-6 px-6 pb-4 pt-2">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between">
                <span className="text-[var(--on-surface-variant)] font-medium">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] flex items-center justify-center hover:border-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="text-lg font-bold text-[var(--on-surface)] w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={increment}
                    disabled={quantity >= maxQuantity}
                    className="w-8 h-8 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] flex items-center justify-center hover:border-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between border-t border-[var(--outline-variant)] pt-4">
                <span className="text-[var(--on-surface-variant)] font-medium">Total Price</span>
                <span className="text-2xl font-bold text-[var(--primary)]">₱{totalPrice}</span>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--on-surface-variant)]">Available</span>
                <span className="text-[var(--on-surface)] font-semibold">{quantityAvailable} tickets</span>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex gap-3 px-6 pb-6">
              <Button
                variant="light"
                onPress={onClose}
                className="flex-1 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] rounded-xl"
              >
                Close
              </Button>
              <Button
                onPress={handleBookNow}
                isLoading={isLoading}
                isDisabled={quantity <= 0 || quantity > quantityAvailable}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl"
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </>
  );
}