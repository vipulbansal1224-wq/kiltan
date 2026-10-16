import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Heart,
  ShieldCheck,
  UtensilsCrossed,
  ArrowUpRight,
  ExternalLink
} from "@/components/Icons";
import { STORE_INFO, CATEGORIES } from "@/data/menu";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio with Logo and Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-stone-950 border-2 border-amber-400/80 shadow-lg shrink-0">
                <Image
                  src="/logo.png"
                  alt="The Kiltan Cafe Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  The Kiltan Cafe
                </span>
                <p className="text-[11px] font-bold text-amber-400 tracking-wide uppercase">
                  Shop No. 34, S.D Market
                </p>
                <p className="text-[10px] text-stone-400">
                  Opp. Housing Board, Kalka, Haryana (133302)
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Kalka's most loved food & hangout destination. Serving 110+ freshly prepared gourmet pizzas, crispy burgers, Belgian waffles, thick shakes and Punjabi beverages with zero hidden charges.
            </p>
            <div className="text-xs text-stone-300 space-y-1">
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>91385-28287, 99914-28287</span>
              </p>
              <p className="text-stone-400 text-[11px]">
                Instagram: <span className="text-amber-300 font-semibold">@thekiltancafekalka</span>
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="bg-stone-800 text-emerald-400 px-2.5 py-1 rounded-md border border-stone-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> FSSAI: {STORE_INFO.fssai}
              </span>
              <span className="bg-stone-800 text-amber-300 px-2.5 py-1 rounded-md border border-stone-700">
                GSTIN: {STORE_INFO.gstin}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-stone-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>Home Page</span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>110+ Dishes Menu</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-bold">Full</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>About Our Kitchen & Story</span>
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-emerald-400 transition flex items-center gap-1 text-emerald-300 font-bold">
                  <span>Zero-Fee Food Delivery</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>Table Reservation & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Food Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-stone-800 pb-2">
              Popular Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/menu?cat=${cat.id}`}
                  className="hover:text-amber-300 transition text-[11px] text-stone-400 flex items-center gap-1"
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Visit & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-stone-800 pb-2">
              Visit The Cafe
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Shop No. 34, S.D Market</p>
                  <p>Opposite Housing Board, Kalka, Haryana (133302)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-300">
                  <a href="tel:9138528287" className="hover:text-white">91385-28287</a>
                  <span>/</span>
                  <a href="tel:9991428287" className="hover:text-white">99914-28287</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sun: 10:30 AM - 10:30 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition"
              >
                <span>Get Directions on Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 The Kiltan Cafe. All rights reserved. S.D Market, Kalka.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for food lovers in Kalka & Pinjore</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
