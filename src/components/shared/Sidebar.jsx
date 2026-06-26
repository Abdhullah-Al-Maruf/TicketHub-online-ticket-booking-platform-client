"use client";

import { Drawer, Button as HeroButton, Separator } from "@heroui/react";
import { FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { FaCodePullRequest, FaTicketSimple } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiAdvertisementFill } from "react-icons/ri";
import { TiTicket } from "react-icons/ti";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { Person, PersonFill, Plus } from "@gravity-ui/icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


// Internal client component for tracking highlighted paths
function NavLinks({ items, onMobileClose }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 flex flex-col gap-1 px-3">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            onClick={onMobileClose}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border bg-pink-200/20 border-[var(--outline-variant)] text-[var(--on-primary)]"
                : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
            }`}
            href={item.href}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ isMobileOpen, onMobileClose, user }) {
  const router = useRouter();

  const vendorNavLinks = [
    { icon: Person, href: "/dashboard/vendor", label: "Profile" },
    { icon: Plus, href: "/dashboard/vendor/add-ticket", label: "Add Tickets" },
    {
      icon: TiTicket,
      href: "/dashboard/vendor/my-tickets",
      label: "My Added Tickets",
    },
    {
      icon: FaCodePullRequest,
      href: "/dashboard/vendor/requested-bookings",
      label: "Requested Booking",
    },
    {
      icon: GiTakeMyMoney,
      href: "/dashboard/vendor/revenue",
      label: "Revenue Overview",
    },
  ];

  const userNavLinks = [
    { icon: Person, href: "/dashboard/user", label: "Profile" },
    {
      icon: TiTicket,
      href: "/dashboard/user/my-bookings",
      label: "My Booked Tickets",
    },
    {
      icon: FaHistory,
      href: "/dashboard/user/transactions",
      label: "Transaction History",
    },
  ];

  const adminNavLinks = [
    { icon: PersonFill, href: "/dashboard/admin", label: "Profile" },
    {
      icon: FaTicketSimple,
      href: "/dashboard/admin/manage-tickets",
      label: "Manage Tickets",
    },
    {
      icon: FaUsers,
      href: "/dashboard/admin/manage-users",
      label: "Manage Users",
    },
    {
      icon: RiAdvertisementFill,
      href: "/dashboard/admin/advertise",
      label: "Advertise Tickets",
    },
  ];

  const navLinksMap = {
    user: userNavLinks,
    vendor: vendorNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "user"];

  const handleLogout = async () => {
    try {
      if (onMobileClose) onMobileClose();
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to safely disconnect session");
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[var(--surface-container)]">
      {/* Header */}
      <div className="mt-5 mb-2 pl-5">
        {/* Brand Name */}
        <span className="text-2xl  font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[red] to-[#b76dff]">
          TicketHub
        </span>
      </div>
<Separator className="border-b border-[var(--outline-variant)] mb-3"/>
      {/* Navigation Links with Active Path Tracker */}
      <NavLinks items={navItems} onMobileClose={onMobileClose} />

      {/* Bottom Section: Home & Logout */}
      <div className="px-3 mt-auto space-y-1">
        <Link
          href="/"
          onClick={onMobileClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--on-surface-variant)] transition-colors hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
        >
          <FaHome className="size-5" />
          Home
        </Link>
        <HeroButton
          fullWidth
          variant="light"
          onClick={handleLogout}
          className="flex items-center justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--on-surface-variant)] bg-transparent hover:bg-[var(--surface-container-high)] hover:text-[var(--error)] min-h-10 h-auto normal-case data-[hover=true]:bg-[var(--surface-container-high)]"
        >
          <BiLogOut className="size-5 shrink-0" />
          Logout
        </HeroButton>
      </div>

      {/* User Profile Card */}
      <div className="mt-4 p-3 mx-3 mb-4 rounded-xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[var(--outline-variant)] overflow-hidden flex items-center justify-center shrink-0">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Profile"}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <Person className="size-6 text-[var(--on-surface)]" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[var(--on-surface)] truncate">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-[var(--on-surface-variant)] truncate">
              {user?.role === "admin" ? "Super Admin" : user?.role || "User"}
            </span>
          </div>
        </div>
        <button className="w-full py-1.5 rounded-md border bg-pink-200/20 border-[var(--outline-variant)] text-[var(--on-primary)] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all">
          {user?.role || "USER"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop View Sidebar - Sticky & Scrollable */}
      <aside className="hidden lg:flex w-64 flex-col shrink-0 border-r border-[var(--outline-variant)] bg-[var(--surface-container)] sticky top-0 h-screen overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile View Drawer System */}
      <Drawer isOpen={isMobileOpen} onOpenChange={onMobileClose}>
        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="bg-[var(--surface-container)] max-w-xs p-0"
          >
            <Drawer.Dialog className="h-full">
              <Drawer.CloseTrigger
                onClick={onMobileClose}
                className="top-4 right-4 z-50 text-[var(--on-surface)]"
              />
              <Drawer.Body className="p-0 h-full overflow-y-auto">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
