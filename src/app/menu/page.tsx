"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Filter,
  Plus,
  Minus,
  MessageCircle,
  Bike,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from "@/components/Icons";
import { MENU_ITEMS, CATEGORIES, STORE_INFO, MenuItem } from "@/data/menu";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [orderTray, setOrderTray] = useState<{ [id: number]: number }>({});

  // Filter dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category match
      if (activeCategory !== "all" && dish.category !== activeCategory) {
        return false;
      }
      // Veg only match
      if (vegOnly && !dish.isVeg) {
        return false;
      }
      // Search match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const inName = dish.name.toLowerCase().includes(q);
        const inDesc = dish.desc.toLowerCase().includes(q);
        const inCat = dish.categoryLabel.toLowerCase().includes(q);
        return inName || inDesc || inCat;
      }
      return true;
    });
  }, [activeCategory, vegOnly, searchQuery]);

  // Tray management
  const addToTray = (id: number) => {
    setOrderTray((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromTray = (id: number) => {
    setOrderTray((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id]--;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const trayCount = Object.values(orderTray).reduce((a, b) => a + b, 0);
  const traySubtotal = Object.entries(orderTray).reduce((sum, [idStr, qty]) => {
    const dish = MENU_ITEMS.find((d) => d.id === parseInt(idStr));
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  // Generate WhatsApp text for quick ordering
  const generateWhatsAppUrl = () => {
    const lines = Object.entries(orderTray).map(([idStr, qty]) => {
      const dish = MENU_ITEMS.find((d) => d.id === parseInt(idStr));
      return `• ${qty}x ${dish ? dish.name : "Item"} (₹${(dish ? dish.price : 0) * qty})`;
    });

    const msg = `Namaste The Kiltan Cafe! Main website se order place karna chahta hoon:\n\n${lines.join(
      "\n"
    )}\n\n*Total Amount:* ₹${traySubtotal}\n*Delivery Address:* [Kripya apna address enter karein]\n\nKripya confirm karein.`;
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      {/* Menu Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>110 Handcrafted Dishes • Zero Extra Fee</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            The Kiltan Cafe Menu 2026
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Every pizza, burger, shake and pasta is freshly cooked to order using wholesome ingredients, real mozzarella cheese, and signature house-made sauces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Search & Veg Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Khana khojein (Burger, Pizza, Noodles, Shake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 font-medium focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Veg Only & Count */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Pure Veg Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-stone-700 select-none">
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                <span>Pure Veg Only</span>
              </span>
            </label>

            {/* Results count badge */}
            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-2 rounded-2xl">
              {filteredDishes.length} Items Found
            </span>
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-700/20"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
            }`}
          >
            <span>🍽️ All Dishes (110)</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-700/20"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-extrabold text-stone-800">
              Koi dish nahi mili
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Aapki search query ke hisaab se koi item match nahi hua. Kripya doosra naam search karein ya filter reset karein.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setVegOnly(false);
              }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => {
              const qty = orderTray[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Dish Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={dish.img}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />

                      {/* Veg indicator badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-stone-800 flex items-center gap-1.5 shadow-sm">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            dish.isVeg ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        />
                        <span>{dish.categoryLabel}</span>
                      </div>

                      {/* Discount badge */}
                      {dish.originalPrice && dish.originalPrice > dish.price && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-sm">
                          Save ₹{dish.originalPrice - dish.price}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-extrabold text-stone-900 group-hover:text-emerald-700 transition line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Add to Tray controls */}
                  <div className="p-4 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-stone-900">
                        ₹{dish.price}
                      </span>
                      {dish.originalPrice && (
                        <span className="text-xs text-stone-400 line-through ml-1.5">
                          ₹{dish.originalPrice}
                        </span>
                      )}
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 px-2 py-1 rounded-xl font-bold border border-emerald-300">
                        <button
                          onClick={() => removeFromTray(dish.id)}
                          className="w-5 h-5 rounded-md hover:bg-emerald-200 flex items-center justify-center text-xs font-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black px-1">{qty}</span>
                        <button
                          onClick={() => addToTray(dish.id)}
                          className="w-5 h-5 rounded-md hover:bg-emerald-200 flex items-center justify-center text-xs font-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToTray(dish.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition flex items-center gap-1 shadow-xs active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FLOATING QUICK ORDER TRAY (Shows when items in tray) */}
      {trayCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-3xl mx-auto z-40 animate-in slide-in-from-bottom duration-300">
          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 text-white p-4 rounded-3xl shadow-2xl border-2 border-emerald-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-stone-950 font-black flex items-center justify-center text-sm shadow-md">
                {trayCount}
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-200">
                  {trayCount} Item{trayCount > 1 ? "s" : ""} selected
                </p>
                <p className="text-base font-black text-white">Subtotal: ₹{traySubtotal}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Option A: Quick WhatsApp Dispatch */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs rounded-2xl shadow-md transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Order via</span>
                <span>WhatsApp</span>
              </a>

              {/* Option B: Open Full Delivery App */}
              <a
                href={STORE_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-2xl shadow-md transition flex items-center gap-1.5"
              >
                <Bike className="w-4 h-4" />
                <span>Zero-Fee Delivery</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-stone-400">Loading Kiltan Cafe Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
