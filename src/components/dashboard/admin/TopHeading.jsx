"use client";

import React from "react";

export default function TopHeading({ activeFilter = "all", onFilterChange }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
          Manage Tickets
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review and manage event ticket listings across all routes.
        </p>
      </div>

      {/* Dynamic Segmented Pill Tabs */}
      <div className="flex items-center bg-white/60 dark:bg-white/3 border  border-white/10 p-1 rounded-full self-start md:self-auto">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange?.(tab.id)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-[#c084fc] text-[#0c0a12] shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}