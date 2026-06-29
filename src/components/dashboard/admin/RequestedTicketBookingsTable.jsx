"use client";

import { approveTicket, rejectTicket } from "@/lib/action/approve-releated-api";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  TableContent,
} from "@heroui/react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaTicketAlt,
} from "react-icons/fa";

export default function RequestedTicketBookingsTable({ bookings = [] }) {
  // Helper to get the correct transport icon matching your data pattern
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-xs" />;
      case "train":
        return <FaTrain className="text-xs" />;
      case "flight":
      case "plane":
        return <FaPlane className="text-xs" />;
      case "ship":
      case "cruise":
        return <FaShip className="text-xs" />;
      default:
        return <FaTicketAlt className="text-xs" />;
    }
  };

  // Shared status chip renderer supporting light/dark theme color contrast formulas
  const renderStatusChip = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === "approved") {
      return (
        <Chip
          size="sm"
          variant="flat"
          className="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/20 px-2.5 font-semibold capitalize"
        >
          Approved
        </Chip>
      );
    }
    if (lowerStatus === "rejected") {
      return (
        <Chip
          size="sm"
          variant="flat"
          className="bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-2.5 font-semibold capitalize"
        >
          Rejected
        </Chip>
      );
    }
    return (
      <Chip
        size="sm"
        variant="flat"
        className="bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 font-semibold capitalize"
      >
        Pending
      </Chip>
    );
  };

  // Formatter for the date display inside the mobile ticket card layout
  const formatTicketDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-GB", options);
    } catch {
      return dateStr;
    }
  };

  // handle accept action for tickets
  const handleAccept = async (ticketId) => {
    const res = await approveTicket(ticketId);
    if (res?.success) {
      toast.success("Ticket approved successfully!");
    }
  };

  // handle reject action for tickets
  const handleReject = async (ticketId) => {
    const res = await rejectTicket(ticketId);
    if (res?.success) {
      toast.success("Ticket rejected successfully!");
    }
  };

  return (
    <div className="mt-6">
      {/* Container wrapper matching light system panels or deep dark sleek panels */}
      <Card className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#12111a] p-2 md:p-6 rounded-2xl shadow-xl dark:shadow-2xl">
        
        {/* ─── Mobile Card View ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-2">
          {bookings.map((booking) => {
            const isPending = booking.status?.toLowerCase() === "pending";
            const ticketId = booking._id?.$oid || booking._id;

            return (
              <div
                key={ticketId}
                className="relative bg-slate-50 dark:bg-[#1b1924] border border-black/5 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-between overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-purple-500 min-h-[240px]"
              >
                {/* Top Badge Row */}
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase border border-black/[0.03] dark:border-white/5">
                    {getTransportIcon(booking.transportType)}
                    <span>{booking.transportType || "Ticket"}</span>
                  </div>
                  {renderStatusChip(booking.status)}
                </div>

                {/* Route Header Segment */}
                <div className="mb-5">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    ROUTE
                  </span>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight leading-snug flex flex-wrap items-center gap-x-2">
                    {booking.route?.from || "Route"}
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
                      →
                    </span>
                    {booking.route?.to || ""}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    ID: {ticketId ? `TKT-${ticketId.slice(-5).toUpperCase()}` : "N/A"}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Vendor:{" "}
                    <span className="text-slate-800 dark:text-slate-300 font-medium">
                      {booking.vendor?.name || "Unknown Vendor"}
                    </span>
                  </div>
                </div>

                {/* Info and Pricing Drawer Matrix */}
                <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-4 mt-auto">
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
                        Departure
                      </span>
                      <div className="text-slate-900 dark:text-white text-sm font-bold">
                        {formatTicketDate(booking.schedule?.date)}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        {booking.schedule?.time || "00:00"}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
                        Price
                      </span>
                      <div className="text-purple-600 dark:text-[#c084fc] text-xl font-extrabold tracking-tight">
                        ৳{booking.pricePerSeat}
                      </div>
                      <div className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">
                        Qty: {booking.quantityAvailable} available
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Quick Action Drawer Overlay */}
                {isPending && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/5 w-full">
                    <Button
                      size="sm"
                      onPress={() => handleAccept(ticketId)}
                      className="flex-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 font-semibold rounded-xl text-xs h-9"
                    >
                      <FaCheck className="text-[10px] mr-1" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      onPress={() => handleReject(ticketId)}
                      className="flex-1 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 font-semibold rounded-xl text-xs h-9"
                    >
                      <FaTimes className="text-[10px] mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Desktop Table View ──────────────── */}
        <div className="hidden md:block overflow-x-auto">
          <Table
            aria-label="Requested Admin Approvals Table"
            className="w-full text-left"
     
          >
            <TableContent>
              <TableHeader className="border-b border-black/10 dark:border-white/10">
                <TableColumn
                  isRowHeader
                  className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent"
                >
                  TITLE / ROUTE
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  VENDOR
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  PRICE
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  QUANTITY
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  STATUS
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent text-right pr-8">
                  ACTIONS
                </TableColumn>
              </TableHeader>

              <TableBody>
                {bookings.map((booking) => {
                  const isPending = booking.status?.toLowerCase() === "pending";
                  const ticketId = booking._id?.$oid || booking._id;

                  return (
                    <TableRow
                      key={ticketId}
                      className="border-b border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors duration-150 last:border-b-0"
                    >
                      {/* Ticket Title / Route */}
                      <TableCell className="py-5 px-6 align-middle">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white text-[15px]">
                            {booking.title}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                            ID: {ticketId ? `TKT-${ticketId.slice(-5).toUpperCase()}` : "N/A"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Vendor Column */}
                      <TableCell className="py-5 px-6 align-middle text-slate-600 dark:text-slate-400 text-sm font-medium">
                        {booking.vendor?.name || "Unknown Vendor"}
                      </TableCell>

                      {/* Pricing Column */}
                      <TableCell className="py-5 px-6 align-middle font-bold text-purple-600 dark:text-[#c084fc] text-base">
                        ৳{booking.pricePerSeat?.toLocaleString()}
                      </TableCell>

                      {/* Quantity Column */}
                      <TableCell className="py-5 px-6 align-middle text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {booking.quantityAvailable}
                      </TableCell>

                      {/* Pill Status Box */}
                      <TableCell className="py-5 px-6 align-middle">
                        {renderStatusChip(booking.status)}
                      </TableCell>

                      {/* Approval/Rejection Icon Triggers */}
                      <TableCell className="py-5 px-6 align-middle text-right pr-8">
                        <div className="flex items-center justify-end gap-3">
                          {isPending ? (
                            <>
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                onClick={() => handleAccept(ticketId)}
                                className="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 min-w-8 h-8 shadow-sm"
                              >
                                <FaCheck className="text-xs" />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                onClick={() => handleReject(ticketId)}
                                className="bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/20 min-w-8 h-8 shadow-sm"
                              >
                                <FaTimes className="text-xs" />
                              </Button>
                            </>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-600 font-bold pr-4">
                              —
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableContent>
          </Table>
        </div>
      </Card>
    </div>
  );
}