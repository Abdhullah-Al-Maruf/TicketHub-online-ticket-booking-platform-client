// components/banners/HeroBanner.jsx
"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="relative w-full max-w-[1280px] mx-auto h-[450px] rounded-xl overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-container)]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--tertiary)]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-[var(--primary-container)]/10 border border-[var(--primary-container)]/30 rounded-full">
            <Icon icon="heroicons:sparkles" className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
              Premium Travel Experience
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--on-surface)] leading-tight mb-3">
            Your Journey Starts Here with 
            <span className="text-[var(--primary)]"> TicketHub</span>
          </h1>

          {/* Description */}
          <p className="text-[var(--on-surface-variant)] text-sm md:text-base mb-6 max-w-xl">
            Book bus, train, launch, and flight tickets seamlessly. Experience premium transport services with real-time tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/all-tickets"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-800 font-semibold rounded-lg hover:brightness-110 transition-all text-sm"
            >
              <Icon icon="heroicons:ticket" className="w-4 h-4" />
              Book Tickets
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--on-surface)] font-medium rounded-lg hover:bg-[var(--surface-container-highest)] transition-all text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}