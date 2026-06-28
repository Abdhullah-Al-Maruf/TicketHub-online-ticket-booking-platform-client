"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Icon } from "@iconify/react";

export default function DashboardLayoutClient({ children, user }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col  text-[var(--on-surface)]">
      
      {/* Standalone Hamburger Trigger (Only visible on mobile/tablet screens) */}
      <div className="lg:hidden flex items-center p-4 border-b border-[var(--outline-variant)] bg-white/50 backdrop:blur-in-md dark:bg-black/50 backdrop:backdrop-blur-lg  sticky top-0 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] rounded-md transition-all"
          aria-label="Open sidebar menu"
        >
          <Icon icon="heroicons:bars-3" className="w-6 h-6" />
        </button>
        <span className="ml-3 font-semibold text-[var(--primary)] text-lg">TicketHub</span>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 w-full">
        
        {/* Sidebar Component with safe client properties */}
        <Sidebar 
          isMobileOpen={isMobileOpen} 
          onMobileClose={() => setIsMobileOpen(false)} 
          user={user}
        />

        {/* Dynamic Pages Area */}
        <main className="flex-1 w-full min-w-0 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-[1280px] mx-auto w-full">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}