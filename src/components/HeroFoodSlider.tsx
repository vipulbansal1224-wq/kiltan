"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Sparkles, Bike, ArrowRight } from "./Icons";

export interface SlideItem {
  id: number;
  name: string;
  category: string;
  badge: string;
  price: number;
  originalPrice: number;
  image: string;
  desc: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    name: "Cheese Delight Burger Combo",
    category: "Burgers & Combos",
    badge: "Chef's Masterpiece",
    price: 235,
    originalPrice: 280,
    image: "/images/CHEESE BURGER.jpeg",
    desc: "Hand-crafted cheesy patty with golden peri-peri fries & free chilled beverage."
  },
  {
    id: 2,
    name: "Butter Paneer Makhani Pizza",
    category: "Artisanal Pizzas",
    badge: "100% Real Mozzarella",
    price: 265,
    originalPrice: 320,
    image: "/images/Butter Paneer Pizza.jpeg",
    desc: "Slow-cooked makhani gravy, roasted malai paneer cubes & melted cheese."
  },
  {
    id: 3,
    name: "Cheesy Hakka Street Noodles",
    category: "Wok Special",
    badge: "Customer Favourite",
    price: 145,
    originalPrice: 180,
    image: "/images/cheese noodles.jpeg",
    desc: "Wok-tossed noodles with crunchy bell peppers, cabbage and melted cheddar."
  },
  {
    id: 4,
    name: "Crispy Corn & Cheese Momos",
    category: "Steamed & Fried Momos",
    badge: "Hot & Crispy",
    price: 135,
    originalPrice: 165,
    image: "/images/Corn & Cheese Momos.jpeg",
    desc: "Golden fried dumplings stuffed with sweet golden corn and melted mozzarella."
  },
  {
    id: 5,
    name: "Farmhouse Cheese Corn Pizza",
    category: "Gourmet Pizzas",
    badge: "Wood-Fired Style",
    price: 220,
    originalPrice: 270,
    image: "/images/cheese corn pizza.jpeg",
    desc: "Golden sweet corn, crisp capsicum, diced onions and double mozzarella."
  },
  {
    id: 6,
    name: "Royal Kiltan Special Falooda",
    category: "Mountain Desserts",
    badge: "Chilled Mountain Sweet",
    price: 140,
    originalPrice: 175,
    image: "/images/Falooda-removebg-preview.png",
    desc: "Layers of rose syrup, vermicelli, sabja seeds, dry fruits & creamy kulfi scoop."
  },
  {
    id: 7,
    name: "Signature Handcrafted Cold Coffee",
    category: "Beverages & Shakes",
    badge: "Arabica Roast",
    price: 99,
    originalPrice: 130,
    image: "/images/cold coffee.jpeg",
    desc: "Double-shot espresso blended with chilled thick milk and rich vanilla froth."
  },
  {
    id: 8,
    name: "Ocean Blue Blast Mojito",
    category: "Coolers & Mocktails",
    badge: "Summer Cooler",
    price: 119,
    originalPrice: 150,
    image: "/images/blue blast mojito.jpeg",
    desc: "Sparkling blue curacao cooler with muddled mint leaves and lime wedges."
  },
  {
    id: 9,
    name: "Mumbai Born Corn Vada Pav",
    category: "Desi Street Food",
    badge: "Spicy & Wholesome",
    price: 75,
    originalPrice: 95,
    image: "/images/Born Corn Vada Pav.jpeg",
    desc: "Golden corn spiced vada in a toasted butter pav with ghati garlic chutney."
  },
  {
    id: 10,
    name: "Pull-Apart Cheese Garlic Bread",
    category: "Appetizers & Starters",
    badge: "Fresh Baked",
    price: 139,
    originalPrice: 170,
    image: "/images/cheese garlic bread.jpeg",
    desc: "Toasted baguette loaf drenched in garlic-herb butter and stretch mozzarella."
  }
];

export default function HeroFoodSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 2-second interval logic
  useEffect(() => {
    if (isPaused) return;

    // Reset progress
    setProgress(0);
    const stepTime = 50; // update progress every 50ms
    const totalSteps = 2000 / stepTime; // 40 steps for 2000ms

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / totalSteps;
      });
    }, stepTime);

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      setProgress(0);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };

  const currentDish = SLIDES[currentIndex];

  return (
    <div
      className="relative mx-auto max-w-sm sm:max-w-md w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Glow aura */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-500 rounded-3xl blur-lg opacity-30 animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900 group">
        
        {/* Progress Bar (2-second cycle) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-stone-800 z-30">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Image Showcase */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-950">
          <Image
            key={currentDish.image}
            src={currentDish.image}
            alt={currentDish.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out animate-in fade-in zoom-in-95 duration-500"
            priority
            sizes="(max-width: 640px) 100vw, 420px"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-transparent" />

          {/* Top Left Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-emerald-400/30">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{currentDish.badge}</span>
          </div>

          {/* Top Right 2-Sec Live Tag */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>2s Auto Rotation</span>
          </div>

          {/* Manual Arrow Controls */}
          <button
            onClick={goToPrev}
            aria-label="Previous Dish"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Next Dish"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Bottom Floating Price Pill on Image */}
          <div className="absolute bottom-3 right-4 z-20 flex items-baseline gap-1.5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-amber-400/40 shadow-xl">
            <span className="text-xl font-black text-amber-400">₹{currentDish.price}</span>
            <span className="text-xs text-stone-400 line-through">₹{currentDish.originalPrice}</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              {currentDish.category}
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              {currentIndex + 1} of {SLIDES.length}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-1">
            {currentDish.name}
          </h3>

          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
            {currentDish.desc}
          </p>

          {/* Bottom Action & Pagination Dots */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-800/80">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-amber-400"
                      : "w-2 bg-stone-700 hover:bg-stone-500"
                  }`}
                />
              ))}
            </div>

            {/* Quick Order Link */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs rounded-xl transition shadow-md shadow-emerald-900/40 active:scale-95"
            >
              <span>Order Dish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Badge 1 (Top Right) */}
      <div className="absolute -top-3.5 -right-3.5 bg-white text-stone-900 px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-200 z-30">
        <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
          🍕
        </div>
        <div className="text-left">
          <p className="text-[9px] text-stone-500 font-bold uppercase leading-none">100% Real</p>
          <p className="text-xs font-black leading-tight text-stone-900">Mozzarella</p>
        </div>
      </div>

      {/* Floating Badge 2 (Bottom Left) */}
      <div className="absolute -bottom-3.5 -left-3.5 bg-emerald-600 text-white px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 z-30 border border-emerald-400/40">
        <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-xs">
          🛵
        </div>
        <div className="text-left">
          <p className="text-[9px] text-emerald-200 font-bold uppercase leading-none">Fresh Delivery</p>
          <p className="text-xs font-black leading-tight">Up to 50 KM</p>
        </div>
      </div>
    </div>
  );
}
