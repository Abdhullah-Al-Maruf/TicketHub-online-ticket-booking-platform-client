// components/banners/PromotionalBanner.jsx
"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function PromotionalBanner() {
  return (
    <div className="relative w-full max-w-[1280px] mx-auto h-[450px] rounded-xl overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-container-high)]">
      {/* Background Glows */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-20 w-48 h-48 bg-[var(--tertiary)]/10 rounded-full blur-2xl translate-y-1/3" />

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-[var(--tertiary)]/20 border border-[var(--tertiary)]/40 rounded-full">
            <Icon icon="heroicons:sparkles" className="w-3.5 h-3.5 text-[var(--tertiary)]" />
            <span className="text-[var(--tertiary)] text-xs font-semibold uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--on-surface)] mb-3">
            Get <span className="text-[var(--tertiary)]">20% Off</span> on Your First Booking
          </h2>
          
          <p className="text-[var(--on-surface-variant)] text-sm mb-6">
            Sign up now and enjoy exclusive discounts. Use code <span className="font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">WELCOME20</span> at checkout.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--tertiary)] text-[var(--on-tertiary)] font-semibold rounded-lg hover:brightness-110 transition-all text-sm"
            >
              <Icon icon="heroicons:rocket-launch" className="w-4 h-4" />
              Claim Offer
            </Link>
            <Link
              href="/all-tickets"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--surface-container)] border border-[var(--outline-variant)] text-[var(--on-surface)] font-medium rounded-lg hover:bg-[var(--surface-container-highest)] transition-all text-sm"
            >
              Browse Tickets
            </Link>
          </div>
        </div>

        {/* Right Visual Element */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center w-64 h-64 relative">
          <div className="absolute inset-0 border-2 border-[var(--primary)]/30 rounded-full animate-pulse" />
          <div className="absolute inset-8 border-2 border-[var(--tertiary)]/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--tertiary)] rounded-2xl flex items-center justify-center shadow-2xl shadow-[var(--primary)]/30 rotate-3">
            <Icon icon="heroicons:ticket" className="w-12 h-12 text-[var(--on-primary)]" />
          </div>

          <div className="absolute -top-2 -right-2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--outline-variant)] rounded-lg shadow-lg">
            <span className="text-lg font-bold text-[var(--tertiary)]">20%</span>
          </div>
        </div>
      </div>
    </div>
  );
}