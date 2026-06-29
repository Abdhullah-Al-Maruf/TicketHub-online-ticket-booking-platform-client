"use client";

import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, TableContent } from "@heroui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function RequestedBookingsTable({ bookings = [], onAccept, onReject }) {
  // Shared status chip renderer with adaptive light/dark accessibility contrast formulas
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

  return (
    <div className="mt-6">
      {/* Container wrapper matching light panels or deep dark sleek panels */}
      <Card className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#12111a] p-2 md:p-6 rounded-2xl shadow-xl dark:shadow-2xl">
        
        {/* ─── Mobile Card View ──────────────────────────── */}
        <div className="block md:hidden space-y-4 p-2">
          {bookings.map((booking) => {
            const isPending = booking.status?.toLowerCase() === "pending";
            return (
              <div
                key={booking.id}
                className="bg-slate-50 dark:bg-[#1b1924] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-3 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-purple-500 pl-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold text-[15px]">
                      {booking.userName || booking.userEmail}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{booking.ticketTitle}</div>
                  </div>
                  {renderStatusChip(booking.status)}
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 font-medium block mb-0.5">Quantity</span>
                    <div className="text-slate-800 dark:text-slate-200 font-bold text-sm">{booking.quantity}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 font-medium block mb-0.5">Total Price</span>
                    <div className="text-green-600 dark:text-green-400 font-bold text-sm">₤{booking.totalPrice}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 dark:text-slate-500 font-medium block mb-0.5">Requested</span>
                    <div className="text-slate-600 dark:text-slate-300 font-medium">{booking.requestedDate}</div>
                  </div>
                </div>

                {/* Actions Panel Layout */}
                {isPending && (
                  <div className="flex gap-2 pt-3 border-t border-black/5 dark:border-white/5 w-full">
                    <Button
                      size="sm"
                      onPress={() => onAccept?.(booking.id)}
                      className="flex-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 font-semibold rounded-xl text-xs h-9"
                    >
                      <FaCheck className="text-[10px] mr-1" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      onPress={() => onReject?.(booking.id)}
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

        {/* ─── Desktop Table View ────────────────────────── */}
        <div className="hidden md:block overflow-x-auto">
          <Table aria-label="Requested Bookings Table" removeWrapper>
            <TableContent>
              <TableHeader className="border-b border-black/10 dark:border-white/10">
                <TableColumn
                  isRowHeader={true}
                  className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent"
                >
                  USER
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  TICKET
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  QUANTITY
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  TOTAL PRICE
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-transparent">
                  REQUESTED
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
                  return (
                    <TableRow
                      key={booking.id}
                      className="border-b border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors duration-150 last:border-b-0"
                    >
                      <TableCell className="py-5 px-6 align-middle font-bold text-slate-900 dark:text-white text-[15px]">
                        {booking.userName || booking.userEmail}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle text-slate-600 dark:text-slate-400 text-sm font-medium">
                        {booking.ticketTitle}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {booking.quantity}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle font-bold text-green-600 dark:text-green-400 text-base">
                        ₤{booking.totalPrice?.toLocaleString()}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle text-slate-600 dark:text-slate-300 text-sm font-medium">
                        {booking.requestedDate}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle">
                        {renderStatusChip(booking.status)}
                      </TableCell>
                      <TableCell className="py-5 px-6 align-middle text-right pr-8">
                        <div className="flex items-center justify-end gap-3">
                          {isPending ? (
                            <>
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                onClick={() => onAccept?.(booking.id)}
                                className="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 border border-green-500/20 min-w-8 h-8 shadow-sm"
                              >
                                <FaCheck className="text-xs" />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                onClick={() => onReject?.(booking.id)}
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