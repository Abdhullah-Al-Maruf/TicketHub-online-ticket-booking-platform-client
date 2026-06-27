"use client";
import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, TableContent } from "@heroui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function RequestedBookingsTable({ bookings, onAccept, onReject }) {
  // Shared status chip renderer
  const renderStatusChip = (status) => {
    const isPending = status === "pending";
    const statusColor = {
      pending: "warning",
      approved: "success",
      rejected: "danger",
    }[status] || "default";

    return (
      <Chip
        size="sm"
        color={statusColor}
        className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${
          isPending ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" : ""
        }`}
      >
        {status}
      </Chip>
    );
  };

  return (
    <div className="mt-6">
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
        {/* ─── Mobile Card View ──────────────────────────── */}
        <div className="block md:hidden space-y-4">
          {bookings.map((booking) => {
            const isPending = booking.status === "pending";
            return (
              <div
                key={booking.id}
                className="bg-slate-800/30 border border-white/5 rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white font-medium">
                      {booking.userName || booking.userEmail}
                    </div>
                    <div className="text-slate-400 text-sm">{booking.ticketTitle}</div>
                  </div>
                  {renderStatusChip(booking.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Quantity</span>
                    <div className="text-white font-semibold">{booking.quantity}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Price</span>
                    <div className="text-green-400 font-semibold">₤{booking.totalPrice}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Requested</span>
                    <div className="text-white">{booking.requestedDate}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    isDisabled={!isPending}
                    onPress={() => onAccept?.(booking.id)}
                    className="flex-1"
                  >
                    <FaCheck className="mr-1" /> Accept
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    isDisabled={!isPending}
                    onPress={() => onReject?.(booking.id)}
                    className="flex-1"
                  >
                    <FaTimes className="mr-1" /> Reject
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Desktop Table View ────────────────────────── */}
        <div className="hidden md:block p-0 overflow-x-auto">
          <Table aria-label="Requested Bookings Table" >
            <TableContent>
              <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                <TableColumn
                  isRowHeader={true}   // ✅ Fix: sets the first column as row header
                  className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                >
                  USER
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  TICKET
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  QUANTITY
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  TOTAL PRICE
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  REQUESTED
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  STATUS
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  ACTIONS
                </TableColumn>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => {
                  const isPending = booking.status === "pending";
                  return (
                    <TableRow
                      key={booking.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                    >
                      <TableCell className="py-4 px-6 align-middle font-medium text-white">
                        {booking.userName || booking.userEmail}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {booking.ticketTitle}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {booking.quantity}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                        ₤{booking.totalPrice}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {booking.requestedDate}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        {renderStatusChip(booking.status)}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            color="success"
                            variant="flat"
                            isDisabled={!isPending}
                            onPress={() => onAccept?.(booking.id)}
                            className="min-w-0 px-3"
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            isDisabled={!isPending}
                            onPress={() => onReject?.(booking.id)}
                            className="min-w-0 px-3"
                          >
                            <FaTimes />
                          </Button>
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