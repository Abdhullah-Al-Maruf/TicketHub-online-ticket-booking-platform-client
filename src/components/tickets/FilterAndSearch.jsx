"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { FaMapMarkerAlt, FaLocationArrow, FaSlidersH, FaHistory } from "react-icons/fa";

export default function FilterAndSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ─── Read from URL ──────────────────────────────────────────────
  const initialFrom = searchParams.get("from") || "";
  const initialTo = searchParams.get("to") || "";
  const initialTransportType = searchParams.get("transportType") || "all";
  const initialSort = searchParams.get("sort") || "low-high";

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [transportType, setTransportType] = useState(initialTransportType);
  const [sort, setSort] = useState(initialSort);

  // ─── Sync URL changes to form ──────────────────────────────────
  useEffect(() => {
    setFrom(searchParams.get("from") || "");
    setTo(searchParams.get("to") || "");
    setTransportType(searchParams.get("transportType") || "all");
    setSort(searchParams.get("sort") || "low-high");
  }, [searchParams]);

  // ─── Apply Filters ─────────────────────────────────────────────
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (transportType && transportType !== "all") params.set("transportType", transportType);
    if (sort) params.set("sort", sort);
    params.set("page", "1"); // reset to first page

    router.push(`${pathname}?${params.toString()}`);
  };

  // ─── Reset ──────────────────────────────────────────────────────
  const handleReset = () => {
    setFrom("");
    setTo("");
    setTransportType("all");
    setSort("low-high");
    router.push("/all-tickets");
  };

  return (
    <div className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-xl p-4 md:p-6 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 items-end">
        {/* From */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">From</label>
          <Input
            placeholder="Dhaka"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            startContent={<FaMapMarkerAlt className="text-[var(--primary)] text-sm shrink-0" />}
            classNames={{
              inputWrapper:
                "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:!border-[var(--primary)] transition-colors h-11 px-3 w-full",
              input: "text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/40 text-sm",
            }}
          />
        </div>

        {/* To */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">To</label>
          <Input
            placeholder="Cox's Bazar"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            startContent={<FaLocationArrow className="text-[var(--primary)] text-xs shrink-0" />}
            classNames={{
              inputWrapper:
                "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:!border-[var(--primary)] transition-colors h-11 px-3 w-full",
              input: "text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/40 text-sm",
            }}
          />
        </div>

        {/* Transport Type – native select */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">Transport Type</label>
          <select
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="w-full h-11 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-md px-3 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] hover:border-[var(--primary)] transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '12px',
            }}
          >
            <option value="all">All</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="flight">Flight</option>
          </select>
        </div>

        {/* Sort – native select */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full h-11 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-md px-3 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] hover:border-[var(--primary)] transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '12px',
            }}
          >
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full sm:col-span-2 lg:col-span-1">
          <Button
            onClick={handleApplyFilters}
            startContent={<FaSlidersH className="text-sm shrink-0" />}
            className="flex-grow bg-[var(--primary)] text-[var(--on-primary)] font-bold h-11 rounded-md transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Apply
          </Button>
          <Button
            onClick={handleReset}
            variant="bordered"
            className="border border-[var(--outline-variant)] hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] font-semibold h-11 rounded-md transition-all px-4 min-w-0"
            title="Reset Filters"
          >
            <FaHistory className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]" />
          </Button>
        </div>
      </div>
    </div>
  );
}