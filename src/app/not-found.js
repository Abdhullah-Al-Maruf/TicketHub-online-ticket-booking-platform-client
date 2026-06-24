"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";


export default function NotFound() {


  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary-container)] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--tertiary)] rounded-full mix-blend-screen filter blur-[120px] opacity-10" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl text-center">
        
        {/* Large 404 Gradient Text */}
        <h1 className="text-9xl sm:text-[12rem] font-bold leading-none mb-6">
          <span className="bg-gradient-to-b from-[var(--primary)] via-[var(--primary-container)] to-[var(--tertiary)] bg-clip-text text-transparent drop-shadow-2xl">
            404
          </span>
        </h1>

        {/* Error Message */}
        <div className="mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--on-surface)] mb-3">
            Looks like this ticket doesn't exist
          </h2>
          <p className="text-[var(--on-surface-variant)] text-base sm:text-lg leading-relaxed">
            The page you're looking for may have been moved or removed. Our usher couldn't find a seat for this URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] font-semibold rounded-lg hover:brightness-110 transition-all duration-200 shadow-lg shadow-[var(--primary-container)]/30 w-full sm:w-auto"
          >
            <Icon icon="heroicons:home" className="w-5 h-5" />
            Back to Home
          </Link>
          
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--surface-container)] border border-[var(--outline-variant)] text-[var(--on-surface)] font-medium rounded-lg hover:bg-[var(--surface-container-high)] hover:border-[var(--primary)] transition-all duration-200 w-full sm:w-auto"
          >
            <Icon icon="heroicons:magnifying-glass" className="w-5 h-5" />
            Search Events
          </Link>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* My Tickets */}
          <Link 
            href="#" 
            className="group p-6 bg-[var(--surface-container)]/50 backdrop-blur-sm border border-[var(--outline-variant)] rounded-xl hover:bg-[var(--surface-container)] hover:border-[var(--primary)]/50 transition-all duration-300 text-left"
          >
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon icon="heroicons:ticket" className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h3 className="text-[var(--on-surface)] font-semibold mb-1">My Tickets</h3>
            <p className="text-[var(--on-surface-variant)] text-sm">
              Manage your current bookings.
            </p>
          </Link>

          {/* Help Center */}
          <Link 
            href="/help" 
            className="group p-6 bg-[var(--surface-container)]/50 backdrop-blur-sm border border-[var(--outline-variant)] rounded-xl hover:bg-[var(--surface-container)] hover:border-[var(--primary)]/50 transition-all duration-300 text-left"
          >
            <div className="w-10 h-10 bg-[var(--tertiary)]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon icon="heroicons:question-mark-circle" className="w-5 h-5 text-[var(--tertiary)]" />
            </div>
            <h3 className="text-[var(--on-surface)] font-semibold mb-1">Help Center</h3>
            <p className="text-[var(--on-surface-variant)] text-sm">
              Find answers to common issues.
            </p>
          </Link>

          {/* Live Support */}
          <Link 
            href="/support" 
            className="group p-6 bg-[var(--surface-container)]/50 backdrop-blur-sm border border-[var(--outline-variant)] rounded-xl hover:bg-[var(--surface-container)] hover:border-[var(--primary)]/50 transition-all duration-300 text-left"
          >
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon icon="heroicons:chat-bubble-left-right" className="w-5 h-5 text-[var(--secondary)]" />
            </div>
            <h3 className="text-[var(--on-surface)] font-semibold mb-1">Live Support</h3>
            <p className="text-[var(--on-surface-variant)] text-sm">
              Talk to an agent right now.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}