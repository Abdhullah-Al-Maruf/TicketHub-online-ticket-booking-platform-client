"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import Logo from "./Logo";
import { LogoFacebook } from "@gravity-ui/icons";
import { FaCcStripe } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Tickets", href: "/tickets" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Ticket Verification", href: "/verify" },
    { name: "Refund Policy", href: "/refunds" },
    { name: "FAQ", href: "/faq" },
  ];

//   const legalLinks = [
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms of Service", href: "/terms" },
//     { name: "Cookie Settings", href: "/cookies" },
//   ];

  const contactInfo = {
    email: "support@tickethub.com",
    phone: "+1 (555) 123-4567",
    facebook: "https://facebook.com/tickethub",
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--outline-variant)] mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
           <div className="flex items-center gap-2.5">
             <Logo />
          </div>
            
            <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
              Book bus, train, launch & flight tickets easily. Connecting travelers with premium transport services nationwide since 2024.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--surface-container)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
                aria-label="Facebook"
              >
                <LogoFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[var(--surface-container)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
                aria-label="Twitter"
              >
                <Icon icon="heroicons:at-symbol" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[var(--surface-container)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
                aria-label="Instagram"
              >
                <Icon icon="heroicons:camera" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--on-surface)] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--primary)] transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--on-surface)] uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--primary)] transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2 pt-4 border-t border-[var(--outline-variant)]">
              <div className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm">
                <Icon icon="heroicons:envelope" className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[var(--primary)] transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm">
                <Icon icon="heroicons:phone" className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-[var(--primary)] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--on-surface)] uppercase tracking-wider mb-4">
              Payment Methods
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]">
                <div className="w-10 h-6 rounded flex items-center justify-center">
               <FaCcStripe size={50} />
                </div>
                <span className="text-[var(--on-surface-variant)] text-sm">
                  Secure payments via Stripe
                </span>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Icon icon="heroicons:credit-card" className="w-5 h-5 text-[var(--on-surface-variant)]" />
                <span className="text-[var(--on-surface-variant)] text-sm">
                  Visa, Mastercard, Amex accepted
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon icon="heroicons:lock-closed" className="w-5 h-5 text-[var(--on-surface-variant)]" />
                <span className="text-[var(--on-surface-variant)] text-sm">
                  256-bit SSL encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--on-surface-variant)] text-sm text-center md:text-left">
              © {currentYear} TicketHub. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--primary)] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--primary)] transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-[var(--on-surface-variant)] text-sm hover:text-[var(--primary)] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}