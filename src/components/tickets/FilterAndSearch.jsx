"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input, Button, Select, ListBox } from "@heroui/react";
import { FaMapMarkerAlt, FaLocationArrow, FaSlidersH } from "react-icons/fa";

export default function FilterAndSearch({ initialFilters }) {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    from: initialFilters?.from || "",
    to: initialFilters?.to || "",
    transportType: initialFilters?.transportType || "all",
    sort: initialFilters?.sort || "low-high",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);
    if (filters.transportType) params.set("transportType", filters.transportType);
    if (filters.sort) params.set("sort", filters.sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  // Human-readable labels mapping for display value fallbacks
  const transportLabels = {
    all: "All",
    bus: "Bus",
    train: "Train",
    launch: "Launch",
    flight: "Flight"
  };

  const sortLabels = {
    "low-high": "Price: Low to High",
    "high-low": "Price: High to Low"
  };

  return (
    <div className="w-full bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-xl p-4 md:p-6 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 items-end">
        
        {/* 1. From Input */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">From</label>
          <Input
            placeholder="Dhaka"
            value={filters.from}
            onChange={(e) => handleChange("from", e.target.value)}
            startContent={<FaMapMarkerAlt className="text-[var(--primary)] text-sm shrink-0" />}
            classNames={{
              inputWrapper: "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:!border-[var(--primary)] transition-colors h-11 px-3 w-full",
              input: "text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/40 text-sm",
            }}
          />
        </div>

        {/* 2. To Input */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">To</label>
          <Input
            placeholder="Cox's Bazar"
            value={filters.to}
            onChange={(e) => handleChange("to", e.target.value)}
            startContent={<FaLocationArrow className="text-[var(--primary)] text-xs shrink-0" />}
            classNames={{
              inputWrapper: "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:!border-[var(--primary)] transition-colors h-11 px-3 w-full",
              input: "text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/40 text-sm",
            }}
          />
        </div>

        {/* 3. Transport Type Select */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">Transport Type</label>
          <Select 
            className="w-full"
            selectedKeys={new Set([filters.transportType])}
            onSelectionChange={(keys) => handleChange("transportType", Array.from(keys)[0] || "all")}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus:border-[var(--primary)] transition-colors h-11 px-3 rounded-md text-sm text-[var(--on-surface)]">
              {/* Using explicit rendering mapping block to avoid single character "R" bug */}
              <Select.Value>
                {() => transportLabels[filters.transportType]}
              </Select.Value>
              <Select.Indicator className="text-[var(--on-surface-variant)] text-xs" />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-[var(--surface-container)] border border-[var(--outline-variant)] p-1 rounded-md text-[var(--on-surface)] min-w-[200px]">
                <ListBox.Item key="all" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">All</ListBox.Item>
                <ListBox.Item key="bus" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Bus</ListBox.Item>
                <ListBox.Item key="train" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Train</ListBox.Item>
                <ListBox.Item key="launch" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Launch</ListBox.Item>
                <ListBox.Item key="flight" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Flight</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 4. Sort Select */}
        <div className="flex flex-col w-full h-full justify-end space-y-2">
          <label className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wide">Sort</label>
          <Select 
            className="w-full"
            selectedKeys={new Set([filters.sort])}
            onSelectionChange={(keys) => handleChange("sort", Array.from(keys)[0] || "low-high")}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus:border-[var(--primary)] transition-colors h-11 px-3 rounded-md text-sm text-[var(--on-surface)]">
              <Select.Value>
                {() => sortLabels[filters.sort]}
              </Select.Value>
              <Select.Indicator className="text-[var(--on-surface-variant)] text-xs" />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-[var(--surface-container)] border border-[var(--outline-variant)] p-1 rounded-md text-[var(--on-surface)] min-w-[200px]">
                <ListBox.Item key="low-high" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Price: Low to High</ListBox.Item>
                <ListBox.Item key="high-low" className="p-2 cursor-pointer rounded hover:bg-[var(--surface-container-high)]">Price: High to Low</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 5. Apply Filters Button */}
        <div className="w-full sm:col-span-2 lg:col-span-1 h-11">
          <Button
            onClick={handleApply}
            startcontent={<FaSlidersH className="text-sm shrink-0" />}
            className="w-full bg-[var(--primary)] text-[var(--on-primary)] font-bold h-full rounded-md transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Apply Filters
          </Button>
        </div>

      </div>
    </div>
  );
}