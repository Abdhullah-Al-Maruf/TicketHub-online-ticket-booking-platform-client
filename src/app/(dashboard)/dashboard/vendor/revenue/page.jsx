
import RecentTransactionsTable from "@/components/dashboard/vendor/RecentTransactionsTable";
import RevenueChart from "@/components/dashboard/vendor/RevenueChart";
import StatCard from "@/components/dashboard/vendor/StatCard";
import TicketsByTransportChart from "@/components/dashboard/vendor/TicketsByTransportChart";

import {
  FaTicketAlt,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

// ─── Static data (replace with API later) ──────────────
const stats = {
  totalTicketsAdded:100,
  totalTicketsSold: 60,
  totalRevenue: 20000.0,
};

const monthlyRevenue = [
  { month: "Jan", value: 2500 },
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 4100 },
  { month: "Apr", value: 3800 },
  { month: "May", value: 5600 },
  { month: "Jun", value: 6200 },
];

const transportData = [
  { type: "Bus", count: 20, percentage: 30, color: "bg-blue-500" },
  { type: "Train", count: 20, percentage: 30, color: "bg-green-500" },
  { type: "Launch", count: 10, percentage: 10, color: "bg-amber-500" },
  { type: "Plane", count: 20, percentage: 30, color: "bg-purple-500" },
];

const recentTransactions = [
  { id: "#TH-90231", date: "Oct 24, 2023", route: "Dhaka → Chittagong", method: "Credit Card", status: "Completed", amount: 1200.0 },
  { id: "#TH-90232", date: "Oct 24, 2023", route: "Sylhet → Dhaka", method: "Mobile Wallet", status: "Completed", amount: 450.0 },
  { id: "#TH-90233", date: "Oct 23, 2023", route: "Rajshahi → Dhaka", method: "Credit Card", status: "Pending", amount: 890.0 },
];

export default function RevenuePage() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Revenue Overview
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Monitor your ticketing performance, track transaction volume, and
          analyze revenue streams across multiple transport sectors.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<FaTicketAlt className="text-purple-500 dark:text-purple-400" />}
          label="Total Tickets Added"
          value={stats.totalTicketsAdded.toLocaleString()}
        />
        <StatCard
          icon={<FaShoppingCart className="text-emerald-500 dark:text-emerald-400" />}
          label="Total Tickets Sold"
          value={stats.totalTicketsSold.toLocaleString()}
        />
        <StatCard
          icon={<FaDollarSign className="text-amber-500 dark:text-amber-400" />}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
        />
      </div>

     {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />
        <TicketsByTransportChart data={transportData} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactionsTable transactions={recentTransactions} />
    </div>
  );
}