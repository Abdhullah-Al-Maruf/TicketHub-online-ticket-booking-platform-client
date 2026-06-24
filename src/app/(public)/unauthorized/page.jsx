"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary-container)] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--tertiary)] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Glassmorphism Card */}
        <div className="bg-[var(--surface-container)]/70 backdrop-blur-xl border border-[var(--outline-variant)] rounded-xl shadow-2xl shadow-black/30 p-8 sm:p-12 text-center">
          
          {/* Animated Lock Icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Pulsing Ring */}
            <div className="absolute inset-0 bg-[var(--error-container)]/20 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-[var(--error-container)]/10 rounded-full animate-pulse" />
            
            {/* Icon Container */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--error-container)] to-[var(--error)] rounded-full flex items-center justify-center shadow-2xl shadow-[var(--error)]/30">
              <Icon 
                icon="heroicons:lock-closed" 
                className="w-12 h-12 text-[var(--on-error-container)]" 
              />
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-br from-[var(--error)] to-[var(--error-container)] bg-clip-text text-transparent leading-none mb-2">
              403
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--error)] to-transparent rounded-full" />
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--on-surface)] mb-3">
              Unauthorized Access
            </h2>
            <p className="text-[var(--on-surface-variant)] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
            </p>
          </div>

          {/* Possible Reasons */}
          <div className="bg-[var(--surface-container-high)]/50 border border-[var(--outline-variant)] rounded-lg p-6 mb-8 text-left">
            <h3 className="text-sm font-semibold text-[var(--on-surface)] mb-3 flex items-center gap-2">
              <Icon icon="heroicons:information-circle" className="w-5 h-5 text-[var(--primary)]" />
              Possible reasons:
            </h3>
            <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
              <li className="flex items-start gap-2">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <span>You are not logged in or your session has expired</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <span>Your account doesn't have the required permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <span>The resource is restricted to specific user roles</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--on-surface)] font-medium rounded-lg hover:bg-[var(--surface-container-highest)] hover:border-[var(--primary)] transition-all duration-200"
            >
              <Icon icon="heroicons:arrow-left" className="w-5 h-5" />
              Go Back
            </button>
            
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold rounded-lg hover:brightness-110 transition-all duration-200 shadow-lg shadow-[var(--primary-container)]/25"
            >
              <Icon icon="heroicons:home" className="w-5 h-5" />
              Go to Homepage
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-8 pt-6 border-t border-[var(--outline-variant)]">
            <p className="text-sm text-[var(--on-surface-variant)]">
              Need help?{" "}
              <Link 
                href="/support" 
                className="text-[var(--primary)] hover:text-[var(--tertiary)] font-medium transition-colors inline-flex items-center gap-1"
              >
                Contact Support
                <Icon icon="heroicons:arrow-right" className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Error Code Reference */}
        <div className="text-center mt-6 text-xs text-[var(--outline)]">
          <p>Error Code: 403 FORBIDDEN</p>
        </div>
      </div>
    </div>
  );
}