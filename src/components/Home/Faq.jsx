"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I book a ticket on TicketHub?",
      answer:
        "Simply browse available routes, select your preferred date and time, choose your seat, and complete the payment. You'll receive an instant confirmation via email and SMS with your e-ticket.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes! You can cancel or reschedule your booking up to 24 hours before departure. Cancellations made within this window are eligible for a full refund. Visit your dashboard to manage bookings.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), mobile banking, and digital wallets. All transactions are processed securely through Stripe with 256-bit SSL encryption.",
    },
    {
      question: "How do I verify my ticket is genuine?",
      answer:
        "Every ticket issued by TicketHub comes with a unique QR code and booking reference number. You can verify your ticket's authenticity on our verification page or by scanning the QR code at the boarding point.",
    },
    {
      question: "Is there a vendor registration process?",
      answer:
        "Yes, transport operators can register as vendors on our platform. Once approved, you can list your routes, manage bookings, and track revenue through our vendor dashboard. Contact our support team to get started.",
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-full">
          <Icon icon="heroicons:question-mark-circle" className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
            FAQ
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--primary)] via-[#a855f7] to-[#4f46e5] bg-clip-text text-transparent drop-shadow-sm tracking-tight py-1">
     Frequently Asked Questions
</h1>
        <p className="text-[var(--on-surface-variant)] max-w-2xl mx-auto">
          Everything you need to know about TicketHub. Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-300 ${
              openIndex === index
                ? "bg-[var(--surface-container)] border-[var(--primary)]/50 shadow-lg shadow-[var(--primary)]/5"
                : "bg-[var(--surface-container)] border-[var(--outline-variant)] hover:border-[var(--primary)]/30"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span
                className={`font-semibold text-sm md:text-base transition-colors ${
                  openIndex === index
                    ? "text-[var(--primary)]"
                    : "text-[var(--on-surface)]"
                }`}
              >
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[var(--primary)] text-[var(--on-primary)] rotate-180"
                    : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]"
                }`}
              >
                <Icon icon="heroicons:chevron-down" className="w-5 h-5" />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <div className="pt-3 border-t border-[var(--outline-variant)]">
                  <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-10">
        <p className="text-[var(--on-surface-variant)] text-sm mb-4">
          Still have questions?
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--on-surface)] font-medium rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
          <Icon icon="heroicons:chat-bubble-left-right" className="w-5 h-5" />
          Contact Support
        </button>
      </div>
    </section>
  );
}