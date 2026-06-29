
import { Card } from "@heroui/react";

export default function StatCard({ icon, label, value }) {
  return (
    <Card className="bg-surface border border-border rounded-2xl p-5 shadow-custom flex items-center gap-4">
      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">
          {label}
        </p>
        <p className="text-2xl font-bold text-on-surface">{value}</p>
      </div>
    </Card>
  );
}