// components/banners/FeatureBanner.jsx
"use client";

import { Icon } from "@iconify/react";

export default function FeatureBanner() {
  const features = [
    { icon: "heroicons:shield-check", title: "Secure Booking", desc: "256-bit SSL encryption", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
    { icon: "heroicons:clock", title: "Instant Confirmation", desc: "Tickets via email & SMS", color: "text-[var(--tertiary)]", bg: "bg-[var(--tertiary)]/10" },
    { icon: "heroicons:banknotes", title: "Best Price Guarantee", desc: "No hidden fees", color: "text-[var(--secondary)]", bg: "bg-[var(--secondary)]/10" },
    { icon: "heroicons:headphones", title: "24/7 Support", desc: "Round-the-clock help", color: "text-[var(--error)]", bg: "bg-[var(--error)]/10" },
  ];

  return (
    <div className="relative w-full max-w-[1280px] mx-auto h-[450px] rounded-xl overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-container)] flex flex-col">
      {/* Header */}
      <div className="px-8 md:px-16 pt-10 pb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--on-surface)] mb-2">
          Why Choose <span className="text-[var(--primary)]">TicketHub</span>?
        </h2>
        <p className="text-[var(--on-surface-variant)] text-sm max-w-xl mx-auto">
          We provide the best travel booking experience with cutting-edge technology.
        </p>
      </div>

      {/* Features Grid */}
      <div className="flex-grow px-8 md:px-16 pb-10 flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] rounded-lg hover:border-[var(--primary)]/50 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`w-10 h-10 ${feature.bg} ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon icon={feature.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-[var(--on-surface)] font-semibold text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-[var(--on-surface-variant)] text-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}