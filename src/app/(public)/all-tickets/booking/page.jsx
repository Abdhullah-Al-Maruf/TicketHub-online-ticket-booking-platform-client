"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { FaMinus, FaPlus, FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { addBooking } from "@/lib/action/tickets";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();

  // Read query params
  const ticketId = searchParams.get("ticketId");
  const quantityAvailable = parseInt(searchParams.get("quantityAvailable") || "0", 10);
  const price = parseInt(searchParams.get("price") || "0", 10);
  const title = searchParams.get("title") || "Unknown Ticket";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
    const image = searchParams.get("image") || "";
  const transportType = searchParams.get("transportType") || "";
  const vendorName = searchParams.get("vendorName") || "";
  const vendorEmail = searchParams.get("vendorEmail") || "";

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Invalid booking
  if (!ticketId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#1C1C1E] px-4">
        <div className="text-center">
          <FaTicketAlt className="text-6xl text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Invalid Booking Request</h1>
          <p className="mt-2 text-gray-600 dark:text-[#8E8E93]">Please go back and try again.</p>
          <Button onPress={() => router.back()} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const maxQuantity = Math.min(quantityAvailable, 10);
  const totalPrice = quantity * price;
  const isSoldOut = quantityAvailable <= 0;

  const increment = () => {
    if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleConfirmBooking = async () => {
    if (quantity <= 0 || quantity > quantityAvailable) {
      toast.error(`Please select between 1 and ${quantityAvailable} tickets`);
      return;
    }
    if (!session?.user?.email) {
      toast.error("You must be logged in to book tickets");
      return;
    }
    setIsLoading(true);
    try {
        const payload = {
        ticketId,
        ticketTitle: title,
        pricePerSeat: price,
        quantity,
        image: image,
        transportType: transportType,
        totalPrice,
        route: { from, to },
        schedule: { date, time },
        vendor: {
          name: vendorName,
          email: vendorEmail,
        },
        user: {
          name: session.user.name || "Guest",
          email: session.user.email,
        },
      };
      console.log(payload);
      const data = await addBooking(payload);
      if (data.success) {
        toast.success("Booking request submitted successfully!");
        router.push("/dashboard/user/my-bookings");
      } else {
        toast.error(data.message || "Failed to book ticket");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E]/10 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-200/60 dark:border-[#3A3A3C] overflow-hidden transition-all duration-300">
        {/* Decorative header gradient */}
        <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500" />

        <div className="p-6">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-[#8E8E93] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1.5 rounded-full">
              <FaTicketAlt className="text-purple-600 dark:text-purple-400 text-sm" />
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Booking</span>
            </div>
          </div>

          {/* Ticket info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book Tickets</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-[#8E8E93]">
              {title} · {from} → {to}
            </p>
            <p className="text-sm text-gray-500 dark:text-[#8E8E93]">
              {date} at {time}
            </p>
            {vendorName && (
              <p className="text-xs text-gray-500 dark:text-[#8E8E93] mt-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-purple-400" />
                Provided by {vendorName}
              </p>
            )}
          </div>

          {/* Quantity selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700 dark:text-[#8E8E93] text-lg">Quantity</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {quantityAvailable} available
              </span>
            </div>
            <div className="bg-gray-100 dark:bg-[#2C2C2E]/20 rounded-2xl p-3 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={decrement}
                disabled={quantity <= 1}
                className="w-12 h-12 flex items-center justify-center text-gray-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-[#3A3A3C] rounded-xl transition-colors"
              >
                <FaMinus />
              </button>
              <span className="text-4xl font-bold text-gray-900 dark:text-white w-16 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increment}
                disabled={quantity >= maxQuantity || quantity >= quantityAvailable}
                className="w-12 h-12 flex items-center justify-center text-gray-700 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-[#3A3A3C] rounded-xl transition-colors"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Total price */}
          <div className="mt-8 bg-gray-100 dark:bg-[#2C2C2E]/20 rounded-2xl p-5 flex items-center justify-between border border-gray-200 dark:border-[#3A3A3C]">
            <span className="text-gray-700 dark:text-[#8E8E93] font-medium">Total</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums flex items-center gap-1">
              <TbCoinTaka className="text-purple-600 dark:text-purple-400" />
              {totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <Button
              variant="light"
              onPress={() => router.back()}
              className="flex-1 h-14 text-gray-700 dark:text-[#8E8E93] hover:text-gray-900 dark:hover:text-white bg-transparent border border-gray-300 dark:border-[#3A3A3C] rounded-2xl font-medium"
            >
              Cancel
            </Button>
            <Button
              onPress={handleConfirmBooking}
              isLoading={isLoading}
              isDisabled={isSoldOut || quantity <= 0}
              className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-400/20 transition-all duration-200 font-semibold rounded-2xl text-lg"
            >
              Confirm Booking
            </Button>
          </div>

          {isSoldOut && (
            <p className="text-xs text-red-500 dark:text-red-400 text-center mt-4">
              All seats are sold out
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-[#1C1C1E] flex items-center justify-center text-gray-700 dark:text-white">
          <Spinner className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}