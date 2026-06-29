
import { Card } from "@heroui/react";

export default function TransportDistribution({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="bg-surface border border-border rounded-2xl p-5 shadow-custom">
      <h3 className="text-on-surface font-semibold mb-4">Tickets by Transport</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.type} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
            <span className="text-on-surface-variant text-sm flex-1">{item.type}</span>
            <span className="text-on-surface font-bold text-sm">
              {item.count.toLocaleString()}
            </span>
            <span className="text-on-surface-variant text-xs">
              ({item.percentage}%)
            </span>
            <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
        <div className="border-t border-border pt-3 mt-2 flex justify-between text-sm">
          <span className="text-on-surface-variant">Total</span>
          <span className="text-on-surface font-bold">{total.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}