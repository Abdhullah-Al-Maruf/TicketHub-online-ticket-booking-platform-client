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
import { CiNoWaitingSign } from "react-icons/ci";

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
    status,
    paymentStatus,
  } = booking;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isDeparted, setIsDeparted] = useState(false);

  useEffect(() => {
    const dateStr = schedule?.date;
    const timeStr = schedule?.time;

    if (!dateStr || !timeStr) return;

    const target = new Date(`${dateStr} ${timeStr}`);

    if (isNaN(target.getTime())) return;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target.getTime() - now);

      if (diff === 0) {
        setIsDeparted(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="flat"
            color="warning"
            className="p-2 bg-yellow-500/20 text-yellow-400"
          >
            <FaHourglassHalf className="mr-2" />
            Pending
          </Badge>
        );

      case "accepted":
        return (
          <Badge
            variant="flat"
            color="success"
            className="p-2 bg-green-500/20 text-green-400"
          >
            <FaCheckCircle className="mr-2" />
            Accepted
          </Badge>
        );

      case "rejected":
        return (
          <Badge
            variant="flat"
            color="danger"
            className="p-2 bg-red-500/20 text-red-400"
          >
            <FaTimesCircle className="mr-2" />
            Rejected
          </Badge>
        );

      default:
        return null;
    }
  };

  const getTransportIcon = () => {
    switch (transportType?.toLowerCase()) {
      case "bus":
        return <FaBus />;

      case "train":
        return <FaTrain />;

      case "launch":
        return <FaShip />;

      case "flight":
        return <FaPlane />;

      default:
        return null;
    }
  };

  const isExpired = isDeparted;

  return (
    <Card
      className="bg-[var(--surface-container)] border border-[var(--outline-variant)] overflow-hidden rounded-xl flex flex-col"
      radius="lg"
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image || "/placeholder-ticket.jpg"}
          alt={ticketTitle}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <span className="absolute top-3 left-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-semibold">
          {getTransportIcon()}
          {transportType}
        </span>

        <div className="absolute bottom-5 right-5">{getStatusBadge()}</div>
      </div>

      <div className="p-5 flex-grow space-y-4">
        <h2 className="text-xl font-bold">{ticketTitle}</h2>
        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt />
          {route?.from} → {route?.to}
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            {schedule?.date}
          </div>

          <div className="flex items-center gap-1">
            <FaClock />
            {schedule?.time}
          </div>
        </div>
        <div className="flex justify-between border-t pt-3">
          <div>
            <p className="text-sm text-gray-400">Quantity</p>

            <h3 className="font-bold text-lg">{quantity}</h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Total</p>

            <h3 className="text-lg font-bold text-primary">
              ৳{totalPrice.toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="bg-[var(--surface-container-low)] rounded-xl p-3">
          {isExpired ? (
            <div className="flex items-center gap-2 text-red-400">
              <FaExclamationCircle />
              Departed
            </div>
          ) : (
            <div className="flex justify-center gap-2 font-mono">
              <div>{String(timeLeft.days).padStart(2, "0")}D</div>

              <div>{String(timeLeft.hours).padStart(2, "0")}H</div>

              <div>{String(timeLeft.minutes).padStart(2, "0")}M</div>

              <div>{String(timeLeft.seconds).padStart(2, "0")}S</div>
            </div>
          )}
        </div>{" "}
        {/* Action Buttons */}
        {status === "pending" && (
          <Button
            isDisabled
            className="w-full  bg-yellow-500/20 text-yellow-400 border border-amber-100 font-semibold"
         
          >
         <CiNoWaitingSign/> Waiting for Vendor Approval
          </Button>
        )}
        {status === "rejected" && (
          <Button
            isDisabled
             variant="danger"
            className="w-full font-semibold"
        
          >
            Booking Rejected
          </Button>
        )}
        {paymentStatus === "paid" && (
          <Button
            isDisabled
         
            className="w-full  bg-green-600 text-white font-semibold"
     
          >
          <FaCheckCircle />  Payment Completed
          </Button>
        )}
        {status === "approved" && paymentStatus !== "paid" && !isExpired && (
          <form action="/api/payment" method="POST">
            <input type="hidden" name="bookingId" value={_id.toString()} />

            <Button
              type="submit"
              startContent={<FaCreditCard />}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-lg"
            >
              Pay Now
            </Button>
          </form>
        )}
        {status === "approved" && paymentStatus !== "paid" && isExpired && (
          <Button
            isDisabled
            color="danger"
            className="w-full font-semibold"
            startContent={<FaExclamationCircle />}
          >
            Journey Already Departed
          </Button>
        )}
      </div>
    </Card>
  );
}
