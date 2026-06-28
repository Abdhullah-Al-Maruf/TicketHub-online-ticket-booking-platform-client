// app/forbidden/page.jsx
"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <MdOutlineLock className="text-5xl text-red-400" />
            </div>

            <h1 className="text-8xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              403
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Access Forbidden
            </h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              You don&apos;t have permission to view this page. Please contact
              your administrator if you believe this is a mistake.
            </p>

            <div className="w-16 h-1 bg-red-500/40 rounded-full mx-auto my-6" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <Button
                as={Link}
                href="/dashboard"
                color="primary"
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                startContent={<FaHome />}
              >
                Go to Dashboard
              </Button>
              <Button
                as="button"
                variant="flat"
                className="border border-white/10 hover:bg-white/5 text-slate-300 font-medium px-6 py-3 rounded-xl transition-all"
                startContent={<FaArrowLeft />}
                onPress={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-6">
              Need help? <Link href="/contact" className="text-purple-400 hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          If you think you should have access, please request permission from your admin.
        </p>
      </div>
    </div>
  );
}