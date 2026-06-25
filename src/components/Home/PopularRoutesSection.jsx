"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function PopularRoutesSection() {
  const routes = [
    {
      from: "Dhaka",
      to: "Chittagong",
      transport: "Bus",
      icon: "heroicons:truck",
      price: 850,
      duration: "5h 30m",
      vendors: 12,
      popular: true,
    },
    {
      from: "Dhaka",
      to: "Sylhet",
      transport: "Bus",
      icon: "heroicons:truck",
      price: 650,
      duration: "4h 15m",
      vendors: 8,
      popular: true,
    },
    {
      from: "Dhaka",
      to: "Cox's Bazar",
      transport: "Bus",
      icon: "heroicons:truck",
      price: 1200,
      duration: "9h 00m",
      vendors: 15,
      popular: false,
    },
    {
      from: "Dhaka",
      to: "Rajshahi",
      transport: "Train",
      icon: "heroicons:train-front",
      price: 450,
      duration: "6h 45m",
      vendors: 5,
      popular: false,
    },
    {
      from: "Chittagong",
      to: "Cox's Bazar",
      transport: "Bus",
      icon: "heroicons:truck",
      price: 500,
      duration: "3h 20m",
      vendors: 10,
      popular: true,
    },
    {
      from: "Dhaka",
      to: "Khulna",
      transport: "Launch",
      icon: "heroicons:sailboat",
      price: 900,
      duration: "12h 00m",
      vendors: 4,
      popular: false,
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 rounded-full">
            <Icon icon="heroicons:fire" className="w-4 h-4 text-[var(--secondary)]" />
            <span className="text-[var(--secondary)] text-xs font-semibold uppercase tracking-wider">
              Popular Routes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--on-surface)] mb-3">
            Most Booked Routes
          </h2>
          <p className="text-[var(--on-surface-variant)] max-w-xl">
            Discover the most popular travel routes chosen by thousands of travelers every day.
          </p>
        </div>
        <Link
          href="/all-tickets"
          className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--tertiary)] transition-colors"
        >
          View All Routes
          <Icon icon="heroicons:arrow-right" className="w-5 h-5" />
        </Link>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
           
            className="group relative p-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-high)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/5"
          >
            {/* Popular Badge */}
            {route.popular && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-full">
                <span className="text-[var(--primary)] text-xs font-semibold">
                  Popular
                </span>
              </div>
            )}

            {/* Transport Icon */}
            <div className="w-10 h-10 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon icon={route.icon} className="w-5 h-5" />
            </div>

            {/* Route */}
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="text-xs text-[var(--on-surface-variant)] mb-0.5">From</div>
                <div className="font-semibold text-[var(--on-surface)]">{route.from}</div>
              </div>
              <Icon icon="heroicons:arrow-right" className="w-4 h-4 text-[var(--primary)]" />
              <div>
                <div className="text-xs text-[var(--on-surface-variant)] mb-0.5">To</div>
                <div className="font-semibold text-[var(--on-surface)]">{route.to}</div>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[var(--on-surface-variant)] text-xs">
                  <Icon icon="heroicons:clock" className="w-4 h-4" />
                  {route.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[var(--on-surface-variant)] text-xs">
                  <Icon icon="heroicons:building-office" className="w-4 h-4" />
                  {route.vendors} vendors
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[var(--on-surface-variant)]">From</div>
                <div className="font-bold text-[var(--primary)] text-lg">
                  ৳{route.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}