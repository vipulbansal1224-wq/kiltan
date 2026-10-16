import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ludhcloud.online/delivery/"),
  title: "The Kiltan Cafe | Kalka's Premier Food & Hangout Destination",
  description:
    "Enjoy 110+ gourmet pizzas, crispy burgers, authentic Italian pasta, Belgian waffles, thick shakes & Punjabi beverages at Shop No. 34, S.D Market, Kalka. Fast 20-min express preparation & zero platform fee online delivery.",
  keywords: [
    "The Kiltan Cafe",
    "Kiltan Cafe Kalka",
    "Best cafe in Kalka",
    "Food delivery Kalka",
    "S.D Market Kalka restaurant",
    "Pizza in Kalka",
    "Burger in Pinjore",
    "Kalka railway station food",
    "Zero fee food delivery"
  ],
  authors: [{ name: "The Kiltan Cafe" }],
  openGraph: {
    title: "The Kiltan Cafe | S.D Market, Kalka",
    description:
      "110+ Gourmet Pizzas, Burgers, Shakes, Waffles & Fast Food with Zero Platform Fee Delivery.",
    url: "https://ludhcloud.online/delivery/",
    siteName: "The Kiltan Cafe",
    images: [
      {
        url: "/images/CHEESE BURGER.jpeg",
        width: 800,
        height: 600,
        alt: "The Kiltan Cafe Specialties"
      }
    ],
    locale: "en_IN",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
