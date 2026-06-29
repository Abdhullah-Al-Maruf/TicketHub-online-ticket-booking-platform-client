// components/dashboard/admin/revenue/RevenueChart.jsx
"use client";

import { useState } from "react";
import { Card } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const [view, setView] = useState("Monthly");

  // For demo, we have monthly data. If yearly, aggregate.
  // You can later transform data based on view.
  const chartData = data || [];

  return (
    <Card className="bg-surface border border-border rounded-2xl p-5 shadow-custom">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-on-surface font-semibold">Revenue Over Time</h3>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setView("Yearly")}
            className={`px-2 py-1 rounded-md transition-colors ${
              view === "Yearly"
                ? "bg-primary text-white"
                : "text-on-surface-variant hover:bg-primary/10"
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setView("Monthly")}
            className={`px-2 py-1 rounded-md transition-colors ${
              view === "Monthly"
                ? "bg-primary text-white"
                : "text-on-surface-variant hover:bg-primary/10"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--on-surface-variant)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              tick={{ fill: "var(--on-surface-variant)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={{ stroke: "var(--border)" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--on-surface)",
              }}
              formatter={(value) => [`$${value}`, "Revenue"]}
            />
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}