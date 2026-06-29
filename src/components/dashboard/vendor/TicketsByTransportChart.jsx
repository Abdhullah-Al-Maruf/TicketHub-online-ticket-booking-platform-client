// components/dashboard/admin/revenue/TicketsByTransportChart.jsx
"use client";

import { Card } from "@heroui/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6"]; // blue, green, amber, purple

export default function TicketsByTransportChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Format for Recharts
  const chartData = data.map((item) => ({
    name: item.type,
    value: item.count,
    percentage: item.percentage,
  }));

  return (
    <Card className="bg-surface border border-border rounded-2xl p-5 shadow-custom">
      <h3 className="text-on-surface font-semibold mb-4">Tickets by Transport</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--on-surface)",
                }}
                formatter={(value, name) => [`${value} tickets`, name]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ color: "var(--on-surface)", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 space-y-2">
          {data.map((item, idx) => (
            <div key={item.type} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-on-surface-variant">{item.type}</span>
              </div>
              <span className="text-on-surface font-semibold">
                {item.count.toLocaleString()}
                <span className="text-on-surface-variant font-normal ml-1">
                  ({item.percentage}%)
                </span>
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
            <span className="text-on-surface-variant">Total</span>
            <span className="text-on-surface font-bold">{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}