"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bike,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Search,
  ExternalLink,
  Download,
  Phone,
  ArrowRight,
  Sparkles,
  AlertTriangle
} from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

export default function DeliveryPage() {
  const [trackOrderCode, setTrackOrderCode] = useState("");
  const [distanceQuery, setDistanceQuery] = useState("");
  const [distanceResult, setDistanceResult] = useState<{
    city: string;
    distanceKm: number;
    deliverable: boolean;
    etaMins: number;
  } | null>(null);

  // Quick delivery radius calculator demo
  const checkDeliveryCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = distanceQuery.toLowerCase().trim();
    if (!query) return;

    if (query.includes("ludhiana") || query.includes("phagwara") || query.includes("jalandhar")) {
      setDistanceResult({
        city: "Ludhiana / Punjab Area",
        distanceKm: 112,
        deliverable: false,
        etaMins: 0,
      });
    } else if (query.includes("panchkula")) {
      setDistanceResult({
        city: "Panchkula, Haryana",
        distanceKm: 18,
        deliverable: true,
        etaMins: 35,
      });
    } else if (query.includes("pinjore")) {
      setDistanceResult({
        city: "Pinjore / HMT",
        distanceKm: 4.5,
        deliverable: true,
        etaMins: 22,
      });
    } else if (query.includes("chandigarh") || query.includes("mohali")) {
      setDistanceResult({
        city: "Chandigarh / Tricity",
        distanceKm: 26,
        deliverable: true,
        etaMins: 45,
      });
    } else {
      // Default local kalka
      setDistanceResult({
        city: distanceQuery,
        distanceKm: 2.1,
        deliverable: true,
        etaMins: 18,
      });
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24 space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Bike className="w-4 h-4 text-amber-400" />
            <span>Zero-Fee Food Delivery Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Fresh Cafe Food Delivered Without Heavy App Commissions.
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Order directly from The Kiltan Cafe with zero platform fee, zero packaging surcharge, realistic 4-stage GPS rider tracking, and up to 50 KM delivery reach.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3.5">
            <a
              href={STORE_INFO.deliveryUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-emerald-900/40 flex items-center gap-2 transition active:scale-95"
            >
              <span>Launch Live Delivery Web App</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`${STORE_INFO.deliveryUrl}india-delivery.apk`}
              download
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-2xl backdrop-blur-sm flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Android APK</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE ZERO-FEE ADVANTAGE COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Clear Honest Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Why Order Direct From The Kiltan Cafe?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Compare a typical 2-Burger + 1-Pizza meal order on standard aggregator apps versus our direct platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden max-w-3xl mx-auto">
          <div className="grid grid-cols-3 bg-stone-900 text-white p-4 font-black text-xs sm:text-sm text-center">
            <span className="text-left pl-2">Charge Breakdown</span>
            <span className="text-stone-400">Other Delivery Apps</span>
            <span className="text-emerald-400">The Kiltan Cafe Direct</span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            <div className="grid grid-cols-3 p-3.5 text-center items-center">
              <span className="text-left font-bold text-stone-800 pl-2">Base Food Price</span>
              <span className="text-stone-500 font-medium">Inflated by 20–30%</span>
              <span className="text-emerald-700 font-extrabold">Original Cafe Menu Price</span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-center items-center bg-stone-50/50">
              <span className="text-left font-bold text-stone-800 pl-2">Platform Fee</span>
              <span className="text-red-600 font-bold">₹10 – ₹15 Extra</span>
              <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full inline-block mx-auto">
                ₹0 FREE
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-center items-center">
              <span className="text-left font-bold text-stone-800 pl-2">Packaging Fee</span>
              <span className="text-red-600 font-bold">₹25 – ₹40 Extra</span>
              <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full inline-block mx-auto">
                ₹0 FREE
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-center items-center bg-stone-50/50">
              <span className="text-left font-bold text-stone-800 pl-2">Delivery Partner</span>
              <span className="text-stone-600">Third-party stranger</span>
              <span className="text-emerald-700 font-bold">Dedicated Cafe Rider</span>
            </div>

            <div className="grid grid-cols-3 p-4 text-center items-center bg-emerald-950 text-white font-black text-sm">
              <span className="text-left pl-2">Total Savings</span>
              <span className="text-stone-400 font-medium">Overpaid ₹85+</span>
              <span className="text-amber-300">You Save ₹70 - ₹90!</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 50 KM DELIVERY RADIUS & INTERACTIVE COVERAGE CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          {/* Left Info */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Service Boundary
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Maximum 50 KM Delivery Range From Kalka
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To guarantee that every pizza stays hot and shakes remain perfectly chilled, we deliver across a 50 km radius around Shop No. 34, S.D Market, Kalka.
            </p>

            <div className="space-y-2 text-xs text-stone-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Zone 1 (0–5 km):</strong> S.D Market, Railway Colony, Tipra, Pinjore (~18 mins)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Zone 2 (5–15 km):</strong> HMT Colony, Surajpur, Chandimandir (~25 mins)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Zone 3 (15–35 km):</strong> Panchkula Sectors & Zirakpur highway (~35-45 mins)</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span><strong>Out of Range (&gt;50 km):</strong> Ludhiana (112 km), Jalandhar (Protected by system)</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Area Checker */}
          <div className="lg:col-span-6 bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
            <h4 className="text-sm font-extrabold text-stone-900">
              Check If We Deliver To Your Locality
            </h4>
            <form onSubmit={checkDeliveryCoverage} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter city or area (e.g. Pinjore, Panchkula, Ludhiana)..."
                value={distanceQuery}
                onChange={(e) => setDistanceQuery(e.target.value)}
                className="flex-1 bg-white border border-stone-300 rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shrink-0 transition"
              >
                Check
              </button>
            </form>

            {/* Result Box */}
            {distanceResult && (
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
                  distanceResult.deliverable
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-red-50 border-red-300 text-red-950"
                }`}
              >
                <div className="flex items-center justify-between font-black">
                  <span className="flex items-center gap-1.5">
                    {distanceResult.deliverable ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span>{distanceResult.city}</span>
                  </span>
                  <span>{distanceResult.distanceKm} km from Kalka</span>
                </div>

                {distanceResult.deliverable ? (
                  <p className="text-[11px] text-emerald-800">
                    🎉 Delivery Available! Estimated delivery time: <strong>~{distanceResult.etaMins} mins</strong>. Zero extra platform fee applied.
                  </p>
                ) : (
                  <p className="text-[11px] text-red-800">
                    ⚠️ Delivery Asambhav! Distance is {distanceResult.distanceKm} km, which exceeds our 50 km freshness limit.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. LIVE ORDER TRACKER SEARCH WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              Live Order Radar
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Track Your Active Kiltan Cafe Order
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Already placed an order? Enter your 7-character order code (e.g. IND-9482) to view the live GPS radar, rider phone number, and OTP.
            </p>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Order Code (IND-9482)"
                value={trackOrderCode}
                onChange={(e) => setTrackOrderCode(e.target.value)}
                className="flex-1 bg-stone-800 border border-stone-700 text-white rounded-2xl px-3.5 py-2.5 text-xs placeholder:text-stone-500 font-mono focus:outline-none focus:border-amber-400"
              />
              <a
                href={
                  trackOrderCode
                    ? `${STORE_INFO.deliveryUrl}?track=${encodeURIComponent(trackOrderCode)}`
                    : STORE_INFO.deliveryUrl
                }
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-2xl transition flex items-center gap-1 shrink-0"
              >
                <span>Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[10px] text-stone-500 text-center">
              Direct connection to live OpenStreetMap tracking radar
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
