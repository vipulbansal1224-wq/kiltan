import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Bike,
  Utensils,
  Phone,
  Heart,
  ChevronRight
} from "@/components/Icons";
import { STORE_INFO, CATEGORIES, MENU_ITEMS } from "@/data/menu";

export default function HomePage() {
  const featuredDishes = MENU_ITEMS.filter((item) => item.isBestseller).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-stone-900 to-stone-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Official Logo & Address Card */}
            <div className="inline-flex flex-col sm:flex-row items-center sm:items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-amber-400/30 backdrop-blur-md shadow-xl text-left">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-stone-950 border-2 border-amber-400 shadow-md shrink-0">
                <Image
                  src="/logo.png"
                  alt="The Kiltan Cafe Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white">
                    THE KILTAN CAFE
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-400/40">
                    Kalka
                  </span>
                </div>
                <p className="text-xs font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>SHOP NO. 34, S.D MARKET, OPPOSITE HOUSING BOARD, KALKA, HARYANA (133302)</span>
                </p>
                <p className="text-[11px] text-stone-300 font-medium">
                  📞 91385-28287, 99914-28287 • Open Daily: 10:30 AM - 10:30 PM
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
              Fresh Flavours, Cozy Mountain Vibes &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-200">
                Artisanal Food.
              </span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Step into The Kiltan Cafe opposite Housing Board, S.D Market, Kalka. Enjoy 110+ gourmet pizzas, crispy burgers, authentic pasta, Belgian waffles, thick shakes and Punjabi beverages made with 100% fresh ingredients and zero hidden charges.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>Explore 110+ Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/delivery"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm rounded-2xl backdrop-blur-sm flex items-center justify-center gap-2 transition"
              >
                <Bike className="w-4 h-4 text-amber-400" />
                <span>Zero-Fee Delivery</span>
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-3.5 text-stone-300 hover:text-white font-bold text-sm flex items-center justify-center gap-1.5 transition"
              >
                <span>Book a Table</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-amber-400">110+</p>
                <p className="text-xs text-stone-400 font-medium">Menu Dishes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">4.9 ★</p>
                <p className="text-xs text-stone-400 font-medium">Customer Love</p>
              </div>
              <div>
                <p className="text-2xl font-black text-teal-300">20 Min</p>
                <p className="text-xs text-stone-400 font-medium">Express Cooking</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-300">₹0 Fee</p>
                <p className="text-xs text-stone-400 font-medium">Zero Platform Fee</p>
              </div>
            </div>
          </div>

          {/* Right Visual Food Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Main Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-stone-800 group">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <Image
                    src="/images/CHEESE BURGER.jpeg"
                    alt="The Kiltan Cafe Signature Burger"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>Chef's Masterpiece</span>
                  </div>
                </div>

                <div className="p-5 bg-stone-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-white">
                      Cheese Delight Burger Combo
                    </h3>
                    <span className="text-lg font-black text-amber-400">₹235</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Hand-crafted cheesy patty with golden peri-peri fries & free Coke can.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -right-4 bg-white text-stone-900 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-stone-200">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  🍕
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-stone-500 font-semibold uppercase">100% Real</p>
                  <p className="text-xs font-black">Mozzarella Pizza</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-xs">
                  🛵
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-200 font-semibold">Delivery Range</p>
                  <p className="text-xs font-black">Up to 50 KM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Why People Love Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            The Kiltan Promise of Quality & Honesty
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            We built this cafe with a simple rule: serve wholesome food that we'd proudly feed our own family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">100% Fresh Kitchen</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No stale pre-made patties or frozen bases. Every pizza dough is hand-stretched and veggies chopped fresh daily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Zero Hidden Charges</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero platform fee and zero packaging fee. What you see on the menu is what you pay. No extra billing surprises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">20-Min Fast Prep</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Speedy kitchen assembly ensures your food reaches your table piping hot, whether you dine in or order delivery.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black">
              <Heart className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Cozy Kalka Hangout</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Warm lights, peaceful foothill vibe, board games and soft acoustic music. The perfect spot to unwind with friends.
            </p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Explore Our Kitchen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              12 Delightful Categories
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>See Full 110 Dishes Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?cat=${cat.id}`}
              className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition text-center space-y-2 group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h4 className="text-xs font-black text-stone-900 group-hover:text-emerald-700 transition">
                {cat.label}
              </h4>
              <p className="text-[10px] text-stone-500 line-clamp-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED BESTSELLERS */}
      <section className="bg-stone-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
              Chef Recommends
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Kalka's Most Ordered Bites
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Loved by college students, local families, and travellers boarding the Kalka-Shimla train.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={dish.img}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-black text-emerald-800 flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{dish.categoryLabel}</span>
                    </div>

                    {dish.originalPrice && dish.originalPrice > dish.price && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-xs">
                        Save ₹{dish.originalPrice - dish.price}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-stone-900 group-hover:text-emerald-700 transition line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="w-3.5 h-3.5 rounded-xs border border-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-stone-900">₹{dish.price}</span>
                    {dish.originalPrice && (
                      <span className="text-xs text-stone-400 line-through ml-1.5">
                        ₹{dish.originalPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/menu?dish=${dish.id}`}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1"
                  >
                    <span>Order</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-2xl shadow-lg transition"
            >
              <span>View All 110 Dishes In Menu</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ZERO FEE DELIVERY SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[11px] font-black tracking-wider uppercase bg-amber-400 text-stone-950 px-3 py-1 rounded-full inline-block">
              🇮🇳 India-delivery Powered
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Food Delivery Without Zomato & Swiggy Commissions.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Order directly through our cloud-powered delivery system. Zero platform fee, zero packaging fee, live GPS rider tracking, and delivery radius up to 50 KM across Kalka, Pinjore, HMT, and Panchkula.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/delivery"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <span>Launch Zero-Fee Delivery App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Kitchen: {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISIT US BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-bold uppercase">Location</p>
              <p className="text-sm font-black text-stone-900">Shop No. 34, S.D Market</p>
              <p className="text-xs text-stone-600">Opp. Housing Board, Kalka (133302)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-bold uppercase">Opening Hours</p>
              <p className="text-sm font-black text-stone-900">Mon - Sun: 10:30 AM - 10:30 PM</p>
              <p className="text-xs text-emerald-700 font-bold">Open Everyday for Dine-in</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Utensils className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-bold uppercase">Table Bookings</p>
              <p className="text-sm font-black text-stone-900">Celebrations & Birthdays</p>
              <Link href="/contact" className="text-xs text-emerald-700 font-bold hover:underline">
                Book a table now →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
