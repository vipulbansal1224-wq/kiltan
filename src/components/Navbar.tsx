"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ShoppingBag,
  Sparkles,
  MapPin,
  Clock,
  UtensilsCrossed,
  Bike
} from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu (110+ Dishes)", badge: "Popular" },
  { href: "/about", label: "About Us" },
  { href: "/delivery", label: "Delivery (Zero Fee)", highlight: true },
  { href: "/contact", label: "Table Booking & Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block border-b border-emerald-700/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Shop No. 34, S.D Market, Kalka, Haryana</span>
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1.5 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Daily: 10:30 AM - 10:30 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-700/80 text-amber-200 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase">
              🎉 ₹0 Platform & Packaging Fee
            </span>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="hover:text-amber-300 transition flex items-center gap-1 font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-stone-200"
            : "bg-white py-3 border-b border-stone-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-stone-900 group-hover:text-emerald-700 transition">
                The Kiltan Cafe
              </span>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Kalka • S.D Market
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 font-extrabold shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-black">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call Cafe</span>
            </a>

            <Link
              href="/delivery"
              className="px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md shadow-emerald-700/25 transition flex items-center gap-1.5 active:scale-95"
            >
              <Bike className="w-4 h-4 text-amber-300" />
              <span>Order Delivery</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs pt-16 flex flex-col justify-between">
          <div className="bg-white p-5 border-b border-stone-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Explore The Kiltan Cafe
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                S.D Market, Kalka
              </span>
            </div>

            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-between ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="py-2.5 px-3 bg-stone-100 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Us</span>
              </a>
              <Link
                href="/delivery"
                className="py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Food</span>
              </Link>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
