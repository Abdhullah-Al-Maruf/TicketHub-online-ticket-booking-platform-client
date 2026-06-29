"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge } from "@heroui/react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaCreditCard,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
} from "react-icons/fa";
// import { loadStripe } from "@stripe/stripe-js";

// Load Stripe (use your publishable key)
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BookingCard({ booking }) {
  const {
    _id,
    ticketTitle,
    image,
    transportType,
    route,
    schedule,
    quantity,
    totalPrice,
    pricePerSeat,
    status,
    paymentStatus,
    vendor,
    ticketId,
  } = booking;

  // ─── Countdown logic ──────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isDeparted, setIsDeparted] = useState(false);

  useEffect(() => {
  
    const dateStr = schedule.date;
    const timeStr = schedule.time;
    if (!dateStr || !timeStr) return;


    const target = new Date(`${dateStr} ${timeStr}`);
    if (isNaN(target.getTime())) return;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target.getTime() - now);
      if (diff === 0) {
        setIsDeparted(true);
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
  }, [schedule]);

  // ─── Status badge ────────────────────────────────────────────
  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="flat" color="warning" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <FaHourglassHalf className="mr-1" /> Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="flat" color="success" className="bg-green-500/20 text-green-400 border-green-500/30">
            <FaCheckCircle className="mr-1" /> Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="flat" color="danger" className="bg-red-500/20 text-red-400 border-red-500/30">
            <FaTimesCircle className="mr-1" /> Rejected
          </Badge>
        );
      case "paid":
        return (
          <Badge variant="flat" color="primary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <FaCheckCircle className="mr-1" /> Paid
          </Badge>
        );
      default:
        return null;
    }
  };

  // // ─── Handle Pay Now ──────────────────────────────────────────
  // const handlePayNow = async () => {
  //   // todo:make the payment api 
  //   try {
  //     const stripe = await stripePromise;
  //     // Call your backend to create a Stripe Checkout session
  //     const response = await fetch("/api/create-checkout-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         bookingId: _id,
  //         ticketTitle,
  //         totalPrice,
  //         quantity,
  //         pricePerSeat,
  //         vendorEmail: vendor?.email,
  //         userEmail: booking.user?.email, // optional
  //       }),
  //     });
  //     const session = await response.json();
  //     if (session.id) {
  //       await stripe.redirectToCheckout({ sessionId: session.id });
  //     } else {
  //       console.error("Failed to create checkout session");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };

  // ─── Helpers ──────────────────────────────────────────────────
  const getTransportIcon = () => {
    const type = transportType?.toLowerCase();
    if (type === "bus") return <FaBus />;
    if (type === "train") return <FaTrain />;
    if (type === "launch") return <FaShip />;
    if (type === "flight") return <FaPlane />;
    return null;
  };

  // Format date/time for display (already formatted in booking data)
  const displayDate = schedule.date || "";
  const displayTime = schedule.time || "";

  // ─── Render ──────────────────────────────────────────────────
  const isExpired = isDeparted;

  return (
    <Card
      className="bg-[var(--surface-container)] border border-[var(--outline-variant)] overflow-hidden h-full flex flex-col rounded-xl"
      radius="lg"
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder-ticket.jpg"}
          alt={ticketTitle}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 left-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
          {getTransportIcon()}
          {transportType}
        </span>
        {/* Status Badge - top right */}
        <div className="absolute bottom-5 right-5">
          {getStatusBadge()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow space-y-4">
        <h3 className="text-xl font-bold text-[var(--on-surface)] line-clamp-1">
          {ticketTitle}
        </h3>

        {/* Route */}
        <div className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm">
          <FaMapMarkerAlt className="text-[var(--primary)]" />
          <span className="font-medium">
            {route?.from || "N/A"} → {route?.to || "N/A"}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-[var(--on-surface-variant)] text-sm">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-[var(--primary)]" />
            <span>{displayDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaClock className="text-[var(--primary)]" />
            <span>{displayTime}</span>
          </div>
        </div>

        {/* Booking details: quantity, total price */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--outline-variant)]">
          <div>
            <span className="text-sm text-[var(--on-surface-variant)]">Quantity</span>
            <p className="text-lg font-bold text-[var(--on-surface)]">{quantity}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-[var(--on-surface-variant)]">Total</span>
            <p className="text-lg font-bold text-[var(--primary)]">
              ৳{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-[var(--surface-container-low)] rounded-xl p-3 border border-[var(--outline-variant)]">
          {isExpired ? (
            <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
              <FaExclamationCircle />
              <span>Departed</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[var(--on-surface)] font-mono text-sm">
              <div className="text-center">
                <span className="text-lg font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
                <span className="text-[10px] text-[var(--on-surface-variant)] block">Days</span>
              </div>
              <span className="text-[var(--on-surface-variant)]">:</span>
              <div className="text-center">
                <span className="text-lg font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[10px] text-[var(--on-surface-variant)] block">Hrs</span>
              </div>
              <span className="text-[var(--on-surface-variant)]">:</span>
              <div className="text-center">
                <span className="text-lg font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] text-[var(--on-surface-variant)] block">Min</span>
              </div>
              <span className="text-[var(--on-surface-variant)]">:</span>
              <div className="text-center">
                <span className="text-lg font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] text-[var(--on-surface-variant)] block">Sec</span>
              </div>
            </div>
          )}
        </div>

        {/* Pay Now button – only if status is "accepted" and not already paid */}
        {status === "accepted" && paymentStatus !== "paid" && (
          <Button
            onPress={handlePayNow}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-lg"
            startContent={<FaCreditCard />}
          >
            Pay Now
          </Button>
        )}

     
      </div>
    </Card>
  );
}