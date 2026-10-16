import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  UtensilsCrossed,
  Users,
  Award,
  ArrowRight,
  Coffee
} from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

export const metadata = {
  title: "About Us | The Kiltan Cafe, Kalka",
  description:
    "Discover the story behind The Kiltan Cafe, Shop No. 34, S.D Market, Kalka. Crafted with passion for food lovers, students, families, and Himalayan travellers."
};

export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen pb-24 space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 text-center relative z-10">
          {/* Logo & Address Card */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-stone-950 border-2 border-amber-400 shadow-2xl">
              <Image
                src="/logo.png"
                alt="The Kiltan Cafe Emblem"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                The Kiltan Cafe
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-300">
                SHOP NO. 34, S.D MARKET, OPPOSITE HOUSING BOARD, KALKA, HARYANA (133302)
              </p>
              <p className="text-xs text-stone-300">
                📞 91385-28287, 99914-28287 • Instagram: @thekiltancafekalka
              </p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Our Story: Passion for Fresh Food, Honest Rates & Great Memories.
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to The Kiltan Cafe. Located at Shop No. 34, S.D Market, Opposite Housing Board, Kalka, we set out to create a sanctuary where high quality dining meets affordable, zero-fee everyday eating.
          </p>
        </div>
      </section>

      {/* 2. THE STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-4/3">
              <Image
                src="/images/veg noodles.jpeg"
                alt="The Kiltan Cafe Fresh Prep"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-700 text-white p-5 rounded-3xl shadow-xl max-w-xs space-y-1 hidden sm:block border-2 border-white">
              <p className="text-xs font-black">FSSAI Certified Kitchen</p>
              <p className="text-[11px] text-emerald-200">
                100% compliant with hygiene, food safety & temperature checks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Where It All Began
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
              A Cozy Hub For Foodies, Students & Himalayan Travellers.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Kalka has always been the historic gateway to Himachal Pradesh. Nestled right near the Kalka Railway Station and the bustling S.D Market, The Kiltan Cafe was envisioned as a vibrant hangout space where youth, local families, and travelers could enjoy world-class cafe fare without paying inflated restaurant prices.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We started with a simple belief: <strong className="text-stone-900">Good food shouldn't be expensive, and clean cooking should never be compromised.</strong> That's why every pizza dough is hand-kneaded, our burger buns are toasted fresh, and our thick shakes are whipped with pure milk and rich ice cream.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <p className="text-2xl font-black text-emerald-600">110+</p>
                <p className="text-xs font-bold text-stone-800">Fresh Menu Choices</p>
                <p className="text-[10px] text-stone-500">Pizzas, burgers, pasta, shakes & lassi</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <p className="text-2xl font-black text-amber-500">₹0</p>
                <p className="text-xs font-bold text-stone-800">Platform Charges</p>
                <p className="text-[10px] text-stone-500">Direct ordering at true cafe rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR FOUR KITCHEN PILLARS */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Quality Above All
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Our 4 Pillars of Fresh Kitchen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                🧀
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Real Mozzarella</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We never use cheap analogue cheese or palm oil blend. Our pizzas and garlic breads feature 100% dairy mozzarella for the authentic stretch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                🥗
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Farm Fresh Veggies</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Crisp bell peppers, juicy sweetcorn, garden tomatoes, and fresh herbs sourced daily from local markets to ensure top nutritional value.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                ⏱️
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Cooked On Demand</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No microwave-reheated meals. Everything begins cooking the moment your ticket hits our kitchen display, taking ~15 to 20 minutes to perfection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                ❤️
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Zero Hidden Fee</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our food delivery package comes with zero platform fee and zero packaging fees, keeping budget food genuinely affordable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Moments & Food
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            A Glimpse of The Kiltan Cafe
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative h-60 rounded-3xl overflow-hidden shadow-sm group">
            <Image
              src="/images/WHITE SAUCE P.jpg"
              alt="White sauce pasta"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative h-60 rounded-3xl overflow-hidden shadow-sm group">
            <Image
              src="/images/maharaja vada pav.PNG"
              alt="Maharaja vada pav"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative h-60 rounded-3xl overflow-hidden shadow-sm group">
            <Image
              src="/images/CHEESE BURGER.jpeg"
              alt="Cheese burger"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="relative h-60 rounded-3xl overflow-hidden shadow-sm group">
            <Image
              src="/images/veg noodles.jpeg"
              alt="Veg noodles"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black">
            Come Visit Us Today in Kalka!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Whether you want a peaceful cold coffee while working, a spicy noodle session with buddies, or a late evening pizza feast, we are open daily from 10:30 AM to 10:30 PM.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 font-black text-xs rounded-xl shadow-md transition"
            >
              Browse Full Menu
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
