"use client";

import React from "react";
import { Phone, MessageCircle } from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(
    "Namaste The Kiltan Cafe! Main menu aur online food order ke baare me poochhna chahta hoon."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      {/* 1. Direct Call Floating Button */}
      <a
        href={`tel:${STORE_INFO.phone}`}
        className="w-12 h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative border-2 border-white"
        aria-label="Call The Kiltan Cafe"
      >
        <Phone className="w-5 h-5 text-emerald-400" />
        <span className="hidden group-hover:block absolute right-14 bg-slate-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md">
          Call: {STORE_INFO.phone}
        </span>
      </a>

      {/* 2. WhatsApp Order Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative border-2 border-white animate-bounce-subtle"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:block absolute right-14 bg-emerald-700 text-white text-xs font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md">
          WhatsApp Order
        </span>
      </a>
    </div>
  );
}
