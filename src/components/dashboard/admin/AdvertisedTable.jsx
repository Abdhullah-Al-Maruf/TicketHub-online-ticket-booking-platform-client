"use client";

import Image from "next/image";
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  Label,
} from "@heroui/react";

import toast from "react-hot-toast";
import { FaBullhorn, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { advertiseTicket, deleteTicket, unadvertiseTicket } from "@/lib/action/tickets";



export default function AdvertisedTable({ tickets = [] }) {
  const onAdvertise = async (ticketId) => {
    const res = await advertiseTicket(ticketId);
    if (res?.success) {
      toast.success("Ticket is now advertised.");
    } else {
      toast.error(res?.error?.message || "Failed to advertise ticket.");
    }
  };

  const onUnadvertise = async (ticketId) => {
    const res = await unadvertiseTicket(ticketId);
    if (res?.success) {
      toast.success("Ticket is no longer advertised.");
    } else {
      toast.error(res?.error?.message || "Failed to unadvertise ticket.");
    }
  };

  const onDelete = async (ticketId) => {
    const res = await deleteTicket(ticketId);
    if (res?.success) {
      toast.success("Ticket deleted successfully.");
    } else {
      toast.error(res?.error?.message || "Failed to delete ticket.");
    }
  };

  // ─── Dropdown Component ──────────────────────────────────────
  const ActionDropdown = ({ ticket }) => {
    const isAdvertised = ticket.advertised === true;

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <div
            role="button"
            tabIndex={0}
            className="flex items-center justify-center text-slate-500 dark:text-slate-400 w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            aria-label="Ticket actions"
          >
            <FaEllipsisV className="text-sm" />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Popover className="bg-white dark:bg-[#1c1a27] border border-black/10 dark:border-white/10 rounded-xl min-w-[160px] shadow-xl">
          <Dropdown.Menu aria-label="Ticket Actions">
            {isAdvertised ? (
              <Dropdown.Item
                id="unadvertise"
                onPress={() => onUnadvertise(ticket._id?.$oid || ticket._id)}
                textValue="Unadvertise"
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-amber-600 dark:text-amber-400 font-medium hover:bg-amber-500/10"
              >
                <FaBullhorn className="text-amber-500" />
                <Label>Unadvertise</Label>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                id="advertise"
                onPress={() => onAdvertise(ticket._id?.$oid || ticket._id)}
                textValue="Advertise"
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-green-600 dark:text-green-400 font-medium hover:bg-green-500/10"
              >
                <FaBullhorn className="text-green-500" />
                <Label>Advertise</Label>
              </Dropdown.Item>
            )}
            <Dropdown.Item
              id="delete"
              onPress={() => onDelete(ticket._id?.$oid || ticket._id)}
              textValue="Delete"
              className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-red-600 dark:text-red-400 font-medium hover:bg-red-500/10"
            >
              <FaTrashAlt className="text-red-500" />
              <Label>Delete</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  };

  // ─── Status Chip Helper ─────────────────────────────────────
  const statusColorMap = {
    approved: "success",
    pending: "warning",
    rejected: "danger",
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <Card className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#12111a] shadow-xl dark:shadow-2xl p-2 sm:p-4 md:p-6 rounded-2xl w-full overflow-hidden">
      {/* ─── Mobile Card View ──────────────────────────────── */}
      <div className="block lg:hidden space-y-4 p-1">
        {tickets.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 py-10 text-center font-medium">
            No tickets found
          </p>
        ) : (
          tickets.map((ticket) => {
            const id = ticket._id?.$oid || ticket._id;
            return (
              <div
                key={id}
                className="bg-slate-50 dark:bg-[#1b1924] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-3 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-purple-500 pl-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-900 dark:text-white font-bold text-[15px] truncate">
                      {ticket.title || "Untitled"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm truncate">
                      {ticket.vendor?.name || "Unknown Vendor"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip
                      size="sm"
                      color={statusColorMap[ticket.status] || "default"}
                      className="font-bold uppercase text-[9px] tracking-wider border"
                    >
                      {ticket.status || "unknown"}
                    </Chip>
                    <ActionDropdown ticket={ticket} />
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">
                    ৳{ticket.pricePerSeat}
                  </span>
                  {ticket.advertised && (
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-[9px] font-bold"
                    >
                      Advertised
                    </Chip>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Desktop Table View ────────────────────────────── */}
      <div className="hidden lg:block w-full overflow-x-auto scrolling-touch">
        <Table
          aria-label="Ticket Management Table"
          className="min-w-[700px] w-full text-left border-collapse"
          removeWrapper
        >
          <TableContent>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/40 border-b border-black/10 dark:border-white/5">
              <TableColumn
                isRowHeader
                className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent"
              >
                Ticket Name
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent">
                Vendor
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent">
                Price
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent">
                Status
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent text-right pr-8 w-[100px]">
                Actions
              </TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <p className="text-slate-400 dark:text-slate-500 py-10 text-center font-medium">
                  No tickets found
                </p>
              }
            >
              {tickets.map((ticket) => {
                const id = ticket._id?.$oid || ticket._id;
                return (
                  <TableRow
                    key={id}
                    className="border-b border-black/5 dark:border-white/5 hover:bg-black/1 dark:hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                  >
                    <TableCell className="py-4 px-6 align-middle font-bold text-slate-900 dark:text-white">
                      {ticket.title || "Untitled"}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle text-slate-600 dark:text-slate-300">
                      {ticket.vendor?.name || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle font-semibold text-emerald-600 dark:text-emerald-400">
                      ৳{ticket.pricePerSeat}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle">
                      <Chip
                        size="sm"
                        color={statusColorMap[ticket.status] || "default"}
                        className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1"
                      >
                        {ticket.status || "unknown"}
                      </Chip>
                      {ticket.advertised && (
                        <span className="ml-2 text-[10px] font-bold text-green-500 border border-green-500/30 px-2 py-0.5 rounded-full">
                          ★ Advertised
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle text-right pr-8">
                      <ActionDropdown ticket={ticket} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
}
