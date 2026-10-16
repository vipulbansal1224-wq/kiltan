"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Calendar,
  Users,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Sparkles
} from "@/components/Icons";
import { STORE_INFO } from "@/data/menu";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "07:00 PM",
    guests: "2 Guests",
    occasion: "Casual Dining",
    specialNotes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Kripya apna naam, phone number aur date enter karein.");
      return;
    }
    setSubmitted(true);
  };

  const generateBookingWhatsApp = () => {
    const text = `Namaste The Kiltan Cafe! Main ek Table Reserve karna chahta hoon:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests}\n*Occasion:* ${formData.occasion}\n*Special Notes:* ${formData.specialNotes || "None"}\n\nKripya meri table booking confirm karein.`;
    return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24 space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Table Reservations & Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Book A Table Or Say Hello To The Kiltan Team.
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Planning a birthday bash, a family lunch, or a coffee meetup in Kalka? Reserve your favorite booth in advance or get in touch directly.
          </p>
        </div>
      </section>

      {/* 2. RESERVATION FORM & CONTACT INFO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive Table Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                Instant Table Reservation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                Reserve Your Spot at The Kiltan Cafe
              </h2>
              <p className="text-xs text-stone-500">
                Guaranteed seating, customized decoration on request, and zero reservation charge.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-3xl text-emerald-950 space-y-4 animate-in zoom-in-95 duration-200 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    Booking Request Ready, {formData.name}!
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                    {formData.guests} ke liye {formData.date} ko shaam {formData.time} par request generate ho gayi hai.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                  <a
                    href={generateBookingWhatsApp()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp to Confirm</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aapka naam..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765-43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                    >
                      <option>11:00 AM</option>
                      <option>01:00 PM</option>
                      <option>03:30 PM</option>
                      <option>05:30 PM</option>
                      <option>07:00 PM</option>
                      <option>08:30 PM</option>
                      <option>09:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                      No. of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                    >
                      <option>1 Person</option>
                      <option>2 Guests</option>
                      <option>3 to 4 Guests</option>
                      <option>5 to 8 Guests</option>
                      <option>Large Party (8+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                    Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    <option>Casual Dining / Hangout</option>
                    <option>Birthday Celebration</option>
                    <option>Anniversary / Date</option>
                    <option>Family Reunion</option>
                    <option>Business / Freelance Meet</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                    Special Notes / Decor Request (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g. Corner booth, Birthday cake table space, Extra quiet zone..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-emerald-700/25 transition active:scale-98"
                >
                  Reserve Table Now (Free)
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contact & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <h3 className="text-base font-extrabold text-stone-900 border-b border-stone-100 pb-3">
                Cafe Details & Helpline
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-stone-900">Address</p>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      {STORE_INFO.address}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      (Opposite S.D Mandir, 3 mins from Kalka Railway Station)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-stone-900">Direct Telephone</p>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-emerald-700 font-mono font-bold hover:underline"
                    >
                      {STORE_INFO.phone}
                    </a>
                    <p className="text-[10px] text-stone-400">Available 10:30 AM – 10:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-stone-900">Opening Hours</p>
                    <p className="text-stone-600 font-medium">Monday to Sunday</p>
                    <p className="text-emerald-700 font-bold">10:30 AM – 10:30 PM (Daily Open)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-stone-900">Email Support</p>
                    <p className="text-stone-600 font-mono">{STORE_INFO.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-900 text-white p-6 rounded-3xl shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-300" />
                <h4 className="text-sm font-black">Fast WhatsApp Chat</h4>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Need immediate catering, bulk party packages, or birthday custom menus? Ping the manager directly.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(
                    "Namaste The Kiltan Cafe, mujhe birthday / bulk party booking ke baare me baat karni hai."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-950 font-black text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-50 transition"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-stone-900">
              Is parking available near The Kiltan Cafe?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Yes, there is dedicated two-wheeler and four-wheeler parking space inside the S.D Market complex, just a few meters from our shop entrance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-stone-900">
              Do you host private birthday parties or anniversary gatherings?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Absolutely! You can reserve multiple tables or pre-book the cozy cafe section for birthdays. We can arrange special lighting, cake space, and custom saver combo menus.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-stone-900">
              Are there pure vegetarian food choices available?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Yes, over 80% of our menu is 100% vegetarian. We maintain strict hygiene protocols and separate preparation stations for veg food.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-stone-900">
              What are the delivery charges and delivery areas?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We operate on a zero platform fee and zero packaging fee policy. Delivery is available up to 50 KM across Kalka, Pinjore, HMT, Surajpur, and Panchkula.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
