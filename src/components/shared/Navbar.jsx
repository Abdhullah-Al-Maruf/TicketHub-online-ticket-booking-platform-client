"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
      setLoading(false);
    };
    fetchSession();
  }, []);
   const role = session?.user?.role;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setSession(null);
      setIsDropdownOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleDashboardClick = () => {
 
    setIsDropdownOpen(false);
    router.push(`/dashboard/${role}`);
  };



  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tickets", href: "/all-tickets" },
    { name: "About", href: "/about" },
  ];

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 h-16 bg-[var(--background)] border-b border-[var(--border)]" />
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Header */}
          <div>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-(--primary)"
                    : "text-(--on-surface-variant) hover:text-(--on-surface)"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* for dynamic dashboard link */}
            {session?.user && (
              <Link
                href={`/dashboard/${role}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === `/dashboard/${role}`
                    ? "text-(--primary)" // Highlights when on the dashboard
                    : "text-(--on-surface-variant) hover:text-(--on-surface)"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-(--on-surface-variant) hover:text-(--on-surface) hover:bg-(--surface-container) rounded-lg transition-all duration-200 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Icon icon="heroicons:moon" className="w-5 h-5" />
              ) : (
                <Icon icon="heroicons:sun" className="w-5 h-5" />
              )}
            </button>

            {/* Auth Buttons - Not Logged In */}
            {!session?.user && (
              <>
                <Link href="/login">
                  <button className="hidden sm:block text-(--on-surface) font-medium hover:text-(--primary) transition-colors px-3 py-2">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-(--primary-container) text-(--on-primary) font-semibold px-5 py-2 rounded-lg hover:brightness-110 transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {/* Profile Dropdown - Logged In */}
            {session?.user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-(--primary) to-(--primary-container) flex items-center justify-center border-2 border-[var(--border)] cursor-pointer overflow-hidden">
                    {session.user.photoURL ? (
                      <Image
                        src={session.user.photoURL}
                        alt={session.user.name}
                        className="w-full h-full rounded-full object-cover"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <span className="text-[var(--on-primary)] font-semibold text-sm">
                        {session.user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-2xl shadow-black/50 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-[var(--on-surface)]">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-[var(--on-surface-variant)] truncate">
                          {session.user.email}
                        </p>
                        <span className="inline-block mt-1 text-xs text-[var(--primary)] capitalize bg-[var(--primary-container)]/10 px-2 py-0.5 rounded-full">
                          {session.user.role}
                        </span>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={handleDashboardClick}
                          className="w-full px-4 py-2.5 text-left text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)] transition-colors flex items-center gap-3"
                        >
                          <Icon
                            icon="heroicons:chart-bar"
                            className="w-5 h-5"
                          />
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-[var(--error)] hover:bg-[var(--surface-container)] transition-colors flex items-center gap-3 border-t border-[var(--border)] mt-1 pt-2.5"
                        >
                          <Icon
                            icon="heroicons:arrow-right-on-rectangle"
                            className="w-5 h-5"
                          />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[var(--on-surface)] p-2 hover:bg-[var(--surface-container)] rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <Icon icon="heroicons:x-mark" className="w-6 h-6" />
              ) : (
                <Icon icon="heroicons:bars-3" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--background)] border-t border-[var(--border)]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-base font-medium ${pathname === link.href ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 py-2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Icon icon="heroicons:sun" className="w-5 h-5" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Icon icon="heroicons:moon" className="w-5 h-5" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>

            {!session?.user && (
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/signin");
                  }}
                  className="w-full py-2.5 text-[var(--on-surface)] font-medium border border-[var(--border)] rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/register");
                  }}
                  className="w-full py-2.5 bg-[var(--primary-container)] text-[var(--on-primary)] font-semibold rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
            {session?.user && (
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleDashboardClick}
                  className="w-full py-2.5 text-[var(--on-surface-variant)] font-medium bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center gap-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-[var(--error)] font-medium flex items-center justify-center gap-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
