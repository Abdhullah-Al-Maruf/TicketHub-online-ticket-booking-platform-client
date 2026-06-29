// components/AdCapacityCard.jsx
"use client";

import { Card } from "@heroui/react";

export default function AdCapacityCard({ totalCapacity = 6, activeAds = 4 }) {
  const usedPercentage = (activeAds / totalCapacity) * 100;

  return (
    <div className="flex flex-col md:flex-row  md:justify-between items-center mb-5">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-black dark:text-amber-50">
          Advertise Tickets
        </h1>
        <p className=" text-black dark:text-amber-50">
          Promote top-tier events to the platform s featured carousel.
        </p>
      </div>

      <Card className=" dark:bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-2xl w-full max-w-md">
        <div className="flex flex-col gap-2">
          {/* ─── Header ────────────────────────────── */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
              AD CAPACITY
            </span>
            <span className="text-sm font-bold  dark:text-white">
              {activeAds}{" "}
              <span className="text-slate-400 font-normal">
                / {totalCapacity}
              </span>
            </span>
          </div>

          {/* ─── Progress bar ──────────────────────── */}
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${usedPercentage}%` }}
            />
          </div>

          {/* ─── Subtle label ────────────────────── */}
          <p className="text-right text-[10px] text-slate-500 mt-0.5">
            {activeAds} active · {totalCapacity - activeAds} slots remaining
          </p>
        </div>
      </Card>
    </div>
  );
}
