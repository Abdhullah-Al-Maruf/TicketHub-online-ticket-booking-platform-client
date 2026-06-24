"use client";

import { Icon } from "@iconify/react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: "heroicons:shield-check",
      title: "Verified Vendors Only",
      description:
        "Every transport operator is manually verified before listing. Travel with confidence knowing your ticket is legitimate.",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/10",
      border: "border-[var(--primary)]/30",
    },
    {
      icon: "heroicons:bolt",
      title: "Instant Booking",
      description:
        "Book tickets in under 60 seconds. Get instant confirmation via email and SMS with your e-ticket ready to use.",
      color: "text-[var(--tertiary)]",
      bg: "bg-[var(--tertiary)]/10",
      border: "border-[var(--tertiary)]/30",
    },
    {
      icon: "heroicons:currency-dollar",
      title: "Best Price Guarantee",
      description:
        "We compare prices across all vendors to ensure you get the most competitive rates. No hidden fees, ever.",
      color: "text-[var(--secondary)]",
      bg: "bg-[var(--secondary)]/10",
      border: "border-[var(--secondary)]/30",
    },
    {
      icon: "heroicons:map",
      title: "Nationwide Coverage",
      description:
        "From major cities to remote towns, we cover 500+ routes across bus, train, launch, and flight services.",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/10",
      border: "border-[var(--primary)]/30",
    },
    {
      icon: "heroicons:clock",
      title: "24/7 Customer Support",
      description:
        "Our support team is available around the clock via chat, email, and phone to assist with any issues.",
      color: "text-[var(--tertiary)]",
      bg: "bg-[var(--tertiary)]/10",
      border: "border-[var(--tertiary)]/30",
    },
    {
      icon: "heroicons:arrow-path",
      title: "Easy Cancellations",
      description:
        "Plans changed? Cancel or reschedule your booking up to 24 hours before departure for a full refund.",
      color: "text-[var(--secondary)]",
      bg: "bg-[var(--secondary)]/10",
      border: "border-[var(--secondary)]/30",
    },
  ];

  return (
    <section className="w-full bg-[var(--surface-container)]/50 border-y border-[var(--outline-variant)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[var(--tertiary)]/10 border border-[var(--tertiary)]/30 rounded-full">
            <Icon icon="heroicons:sparkles" className="w-4 h-4 text-[var(--tertiary)]" />
            <span className="text-[var(--tertiary)] text-xs font-semibold uppercase tracking-wider">
              Benefits
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--on-surface)] mb-3">
            Why Travelers Choose <span className="text-[var(--primary)]">TicketHub</span>
          </h2>
          <p className="text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            We've reimagined the ticket booking experience with cutting-edge technology and a customer-first approach.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group p-6 rounded-xl border ${benefit.border} bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/5`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${benefit.bg} ${benefit.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon icon={benefit.icon} className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">
                {benefit.title}
              </h3>
              <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}