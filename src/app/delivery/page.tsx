"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Bike,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Search,
  ExternalLink,
  Phone,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Loader2,
  MessageCircle
} from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

interface TrackingData {
  order_code: string;
  status: string;
  step: number;
  eta_minutes: number;
  otp: string;
  grand_total?: number;
  payment_method?: string;
  payment_status?: string;
  print_url?: string;
  upi_url?: string;
  upi_qr?: string;
  store: {
    name: string;
    address: string;
    phone: string;
    lat: number;
    lng: number;
  };
  customer: {
    address: string;
    lat: number;
    lng: number;
  };
  rider: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
    current_lat: number;
    current_lng: number;
    call_url: string;
    whatsapp_url: string;
  };
}

function DeliveryContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("order_code") || "";

  const [trackOrderCode, setTrackOrderCode] = useState(initialCode);
  const [activeTracking, setActiveTracking] = useState<TrackingData | null>(null);
  const [isLoadingRadar, setIsLoadingRadar] = useState(false);
  const [trackingError, setTrackingError] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState("");

  const [distanceQuery, setDistanceQuery] = useState("");
  const [distanceResult, setDistanceResult] = useState<{
    city: string;
    distanceKm: number;
    deliverable: boolean;
    etaMins: number;
  } | null>(null);

  // Poll live tracking every 4 seconds when activeTracking exists
  const fetchOrderStatus = async (codeToTrack: string) => {
    if (!codeToTrack.trim()) return;
    setIsLoadingRadar(true);
    setTrackingError("");

    try {
      // 1. Try Kiltan Main API first
      const kRes = await fetch(
        `https://ludhcloud.online/kiltan/api.php?action=track_order&order_no=${encodeURIComponent(
          codeToTrack.trim()
        )}`,
        { cache: "no-store" }
      );
      if (kRes.ok) {
        const kJson = await kRes.json();
        if ((kJson.status === "success" || kJson.success) && kJson.data) {
          setActiveTracking(kJson.data);
          setLastRefreshed(new Date().toLocaleTimeString());
          return;
        }
      }

      // 2. Secondary fallback to delivery API
      const res = await fetch(
        `https://ludhcloud.online/delivery/api/track_order.php?order_code=${encodeURIComponent(
          codeToTrack.trim()
        )}`,
        { cache: "no-store" }
      );
      const json = await res.json();

      if (json.success && json.data) {
        setActiveTracking(json.data);
        setLastRefreshed(new Date().toLocaleTimeString());
      } else {
        setTrackingError("Order nahi mila. Kripya sahi Order Code enter karein (e.g. ORD-0001 ya IND-9482).");
      }
    } catch (err) {
      console.warn("Could not query live radar:", err);
      setTrackingError("Server connect nahi ho paya. Kripya thodi der me dobara try karein.");
    } finally {
      setIsLoadingRadar(false);
    }
  };

  // On mount check query params or local storage
  useEffect(() => {
    let orderToSearch = initialCode;
    if (!orderToSearch && typeof window !== "undefined") {
      orderToSearch = localStorage.getItem("kiltan_active_order") || "";
    }
    if (orderToSearch) {
      setTrackOrderCode(orderToSearch);
      fetchOrderStatus(orderToSearch);
    }
  }, [initialCode]);

  // Periodic polling for live radar
  useEffect(() => {
    if (!activeTracking || !activeTracking.order_code) return;

    const interval = setInterval(() => {
      fetch(
        `https://ludhcloud.online/kiltan/api.php?action=track_order&order_no=${encodeURIComponent(
          activeTracking.order_code
        )}`,
        { cache: "no-store" }
      )
        .then((r) => r.json())
        .then((json) => {
          if ((json.status === "success" || json.success) && json.data) {
            setActiveTracking(json.data);
            setLastRefreshed(new Date().toLocaleTimeString());
          }
        })
        .catch(() => {});
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTracking]);

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
      setDistanceResult({
        city: distanceQuery,
        distanceKm: 2.1,
        deliverable: true,
        etaMins: 18,
      });
    }
  };

  const getStepProgress = (step: number) => {
    switch (step) {
      case 1:
        return "w-1/4 bg-emerald-500";
      case 2:
        return "w-2/4 bg-emerald-500";
      case 3:
        return "w-3/4 bg-amber-400";
      case 4:
        return "w-full bg-emerald-600";
      default:
        return "w-1/4 bg-emerald-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Order Confirmed by Cafe";
      case "preparing":
        return "Kitchen Preparing Fresh Food";
      case "out_for_delivery":
        return "Out for Delivery (Rider en-route)";
      case "delivered":
        return "Delivered Successfully 🎉";
      default:
        return "Active Order Processing";
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24 space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          {/* Logo & Kitchen Hub */}
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
                The Kiltan Cafe Delivery Hub
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-300">
                SHOP NO. 34, S.D MARKET, OPPOSITE HOUSING BOARD, KALKA, HARYANA (133302)
              </p>
              <p className="text-[11px] text-stone-300">
                Helpline: 📞 91385-28287, 99914-28287 • Open Daily: 10:30 AM - 10:30 PM
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Rider GPS Radar Connected</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Direct Zero-Fee Food Delivery Across Kalka & Surrounding Areas
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Order directly from The Kiltan Cafe. No 30% aggregator inflation, ₹0 platform fee, and direct live GPS connection with our dedicated delivery partner.
          </p>
        </div>
      </section>

      {/* 2. LIVE RADAR TRACKING SECTION (Connected with App & Rider) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Real-time Delivery Radar
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                Live Rider GPS Tracking
              </h3>
              <p className="text-xs text-stone-400">
                Synchronized with rider.php & mobile app switchboard
              </p>
            </div>

            {/* Code Search Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchOrderStatus(trackOrderCode);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Enter Order Code (IND-9482)"
                value={trackOrderCode}
                onChange={(e) => setTrackOrderCode(e.target.value.toUpperCase())}
                className="bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 w-44"
              />
              <button
                type="submit"
                disabled={isLoadingRadar}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-xl transition flex items-center gap-1.5"
              >
                {isLoadingRadar ? <Loader2 className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
                <span>Track</span>
              </button>
            </form>
          </div>

          {trackingError && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{trackingError}</span>
            </div>
          )}

          {activeTracking ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Order Status & OTP Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Order Code</span>
                  <p className="text-base font-black font-mono text-emerald-400">
                    #{activeTracking.order_code}
                  </p>
                  <p className="text-[10px] text-stone-400 font-medium">
                    Updated: {lastRefreshed || 'Just now'} (Auto-refresh 4s)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Current Status</span>
                  <p className="text-sm font-extrabold text-amber-300">
                    {getStatusLabel(activeTracking.status)}
                  </p>
                  <p className="text-[10px] text-stone-400 font-medium">
                    ETA: ~{activeTracking.eta_minutes} Minutes
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Delivery OTP</span>
                  <p className="text-lg font-black font-mono text-white tracking-widest bg-stone-900 border border-amber-400/40 px-3 py-1 rounded-xl inline-block mt-0.5">
                    {activeTracking.otp}
                  </p>
                  <p className="text-[10px] text-amber-300/80 font-medium">
                    Rider ko deliver ke waqt batayein
                  </p>
                </div>
              </div>

              {/* Step Progress Bar */}
              <div className="space-y-2">
                <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ease-out ${getStepProgress(
                      activeTracking.step
                    )}`}
                  />
                </div>
                <div className="grid grid-cols-4 text-[10px] text-center font-bold">
                  <span className={activeTracking.step >= 1 ? "text-emerald-400" : "text-stone-500"}>
                    1. Confirmed
                  </span>
                  <span className={activeTracking.step >= 2 ? "text-emerald-400" : "text-stone-500"}>
                    2. Kitchen Preparing
                  </span>
                  <span className={activeTracking.step >= 3 ? "text-amber-400" : "text-stone-500"}>
                    3. Out for Delivery
                  </span>
                  <span className={activeTracking.step >= 4 ? "text-emerald-400" : "text-stone-500"}>
                    4. Delivered
                  </span>
                </div>
              </div>

              {/* Rider & Route Details Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rider Card */}
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Assigned Rider
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      ★ {activeTracking.rider.rating} Top Rated
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 font-black text-xl shadow-md">
                      🛵
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">
                        {activeTracking.rider.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {activeTracking.rider.vehicle}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-mono">
                        {activeTracking.rider.phone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={activeTracking.rider.call_url}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Rider</span>
                    </a>
                    <a
                      href={activeTracking.rider.whatsapp_url}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Live Distance & GPS Route */}
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Route Radar
                    </span>
                    <div className="mt-2 space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400">🏪</span>
                        <div>
                          <p className="font-bold text-stone-300">Pick-up: The Kiltan Cafe</p>
                          <p className="text-[11px] text-stone-400">Shop 34, S.D Market, Kalka</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">🏠</span>
                        <div>
                          <p className="font-bold text-white">Drop: Your Address</p>
                          <p className="text-[11px] text-stone-300 line-clamp-1">
                            {activeTracking.customer.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">Live Rider GPS:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {activeTracking.rider.current_lat.toFixed(4)},{" "}
                      {activeTracking.rider.current_lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Print & Digital Payment Bar */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] font-bold uppercase text-stone-400">Payment & Bill:</span>
                  <p className="text-xs font-bold text-white">
                    Status: <span className="text-emerald-400">{activeTracking.payment_status || "Pending"}</span> ({activeTracking.payment_method || "COD"})
                    {activeTracking.grand_total ? ` • Total: ₹${activeTracking.grand_total}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {activeTracking.print_url && (
                    <a
                      href={activeTracking.print_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                    >
                      <span>🖨️ Print Receipt</span>
                    </a>
                  )}

                  {activeTracking.upi_url && activeTracking.payment_status !== "Paid" && (
                    <a
                      href={activeTracking.upi_url}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                    >
                      <span>📱 Pay via UPI</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3 bg-stone-950/60 rounded-2xl border border-stone-800/80">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto text-xl">
                🛵
              </div>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                Enter your Order Code (e.g. <strong>IND-9482</strong>) above to connect to the live delivery radar.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. ZERO EXTRA FEE PROMISE COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Fair Pricing Policy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Why Order Directly From The Kiltan Cafe?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Big aggregator apps charge up to ₹85 extra in hidden commissions, packaging, and surge platform fees. Here is our honest price comparison.
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

      {/* 4. 50 KM DELIVERY RADIUS & INTERACTIVE COVERAGE CHECKER */}
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
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-xs font-bold text-stone-400">
          Connecting to The Kiltan Cafe Delivery Radar...
        </div>
      }
    >
      <DeliveryContent />
    </Suspense>
  );
}
