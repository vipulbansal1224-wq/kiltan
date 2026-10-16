# 🍕 The Kiltan Cafe - Official Next.js 5-Page Website

**The Kiltan Cafe** (Shop No. 34, S.D Market, Kalka, Haryana) ke liye ek modern, fast aur full-fledged Next.js application jisme sabhi 110 real dishes, 12 categories, table reservation, aur zero-fee delivery package integrated hai.

---

## 🌟 5 Pages Ka Poora Vivaran

### 1. 🏠 Home Page (`/`)
* **Hero Section:** Mountain vibes, Kalka foothill backdrop, high-impact headline, aur direct CTAs (*"Explore 110+ Menu"*, *"Zero-Fee Delivery"*, *"Book a Table"*).
* **Core Value Props:** 100% Fresh Kitchen, Zero Platform & Packaging Fee, 20-Min Express Cooking, Cozy Kalka Hangout.
* **Featured Bestsellers:** Kalka ke sabse popular dishes (Cheese Delight Burger, Korean Cheese Blast Burger, White Sauce Pasta, Maharaja Vada Pav, Veg Noodles, Shakes).
* **12 Categories Grid:** Quick navigation to all categories.
* **Ambience & Experience:** Cafe environment, customer love, opening hours, address banner.

### 2. 🍽️ Full Menu (`/menu`)
* **110 Real Dishes:** All dishes with high-res photos, descriptions, original and discounted prices.
* **12 Categories:** Saver Combos (5), Wood-Fired Style Pizzas (24), Gourmet Burgers (10), Vada Pav (6), Fries & Sides (5), Italian Pasta (5), Sandwiches (6), Chinese & Noodles (12), Stuffed Garlic Breads (7), Thick Shakes & Coffee (12), Kulhad Lassi & Drinks (10), Desserts & Waffles (8).
* **Live Search & Filter:** Dish name or ingredient search + Pure Veg Only toggle.
* **Interactive Order Tray:** Customers can add items to their tray and click **"Order via WhatsApp"** (generates pre-filled WhatsApp message with items, quantities, and subtotal to +91 91385-28287) or click **"Zero-Fee Delivery"**!

### 3. 📖 About Us (`/about`)
* **The Story:** Foothills of Kalka me The Kiltan Cafe ki shuruat, UNESCO Kalka-Shimla Toy Train ke pass travel & hangout destination.
* **4 Kitchen Pillars:** 100% Real Mozzarella, Farm-fresh daily veggies, Cooked on demand (No microwave reheating), Zero hidden charges.
* **Visual Photo Gallery:** Cafe seating, live food prep, signature items.
* **FSSAI & Hygiene Guarantee:** Compliance with food safety and registration standards.

### 4. 🛵 Online Delivery & Takeaway (`/delivery`)
* **Zero-Fee Promise:** Comparison chart showing how customers save ₹70–₹90 per order compared to Zomato & Swiggy.
* **50 KM Delivery Radius:** Interactive zone breakdown (Zone 1: Kalka, Zone 2: Pinjore/HMT, Zone 3: Panchkula/Zirakpur, and strict out-of-range protection for &gt;50 km like Ludhiana).
* **Interactive Coverage Checker:** User apna shehar/area daal kar instant delivery status aur ETA check kar sakte hain.
* **Live Order Radar Tracker:** Enter Order ID (e.g. `IND-9482`) to open the live GPS radar map.
* **Direct Links:** Launch Web App (`https://ludhcloud.online/delivery/`) & Download Android APK.

### 5. 📅 Table Reservation & Contact (`/contact`)
* **Interactive Table Booking Form:** Full Name, Phone, Date, Time Slot, Guests Count, Occasion (Birthday/Anniversary/Casual), and Special Requests.
* **Instant Confirmation & WhatsApp Ping:** Booking submit hote hi details manager ko WhatsApp par deliver hoti hain.
* **Complete Store Details:** Address, Phone, Email, Timings (10:30 AM – 10:30 PM Daily), Landmark.
* **Interactive Map Directions:** 1-Click to open Google Maps navigation.
* **FAQs:** Parking, private birthday parties, pure vegetarian choices, and delivery questions.

---

## 🚀 Local Run Kaise Karein

Terminal ya PowerShell me `kiltan-cafe-web` folder me jayein:

```bash
# 1. Dependencies install karein
npm install

# 2. Development server start karein
npm run dev
```

Browser me kholiye: **`http://localhost:3000`**

---

## ☁️ Cloud Par Push & Custom Domain Setup Guide

### Option 1: Vercel Par Deploy (Sabse Aasan & Free - Recommended for Next.js)
1. Apne code ko GitHub par push karein:
   ```bash
   git init
   git add .
   git commit -m "The Kiltan Cafe Next.js Website"
   git remote add origin https://github.com/<your-username>/kiltan-cafe-web.git
   git push -u origin main
   ```
2. **[vercel.com](https://vercel.com)** par login karein aur *"Add New Project"* par click karein.
3. GitHub repository select karke **Deploy** dabayein. 2 minute me aapki website live ho jayegi!
4. **Custom Domain Lagana (e.g. `thekiltancafe.com`):**
   - Vercel Dashboard ➔ Project Settings ➔ **Domains**.
   - Apna domain type karein (e.g. `thekiltancafe.com`).
   - Apne Domain Registrar (GoDaddy, Namecheap, Hostinger) ke DNS me yeh add karein:
     - **A Record:** `@` ➔ `76.76.21.21`
     - **CNAME Record:** `www` ➔ `cname.vercel-dns.com`

---

### Option 2: Hostinger / cPanel VPS Server (Node.js App)
1. Server ke terminal par files upload karein:
2. Build karein aur PM2 se start karein:
   ```bash
   npm install
   npm run build
   pm2 start npm --name "kiltan-cafe" -- start -- -p 3000
   ```
3. Nginx me reverse proxy set karein:
   ```nginx
   server {
       server_name thekiltancafe.com www.thekiltancafe.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Option 3: Static Export (Direct cPanel `public_html` ke liye)
Agar aapko Node.js server nahi chalana aur direct `public_html` me HTML upload karna hai:
1. `next.config.ts` me `output: 'export'` add karein:
   ```ts
   const nextConfig: NextConfig = {
     output: 'export',
     images: { unoptimized: true }
   };
   ```
2. Build karein:
   ```bash
   npm run build
   ```
3. `out/` folder ke andar ki sabhi files ko seedhe Hostinger / cPanel ke `public_html` me upload kar dein!

---

## 📁 Project Structure

```
kiltan-cafe-web/
├── public/
│   ├── images/          # Sabhi 132 real food photos
│   └── logo.png         # The Kiltan Cafe official logo
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Global SEO, Navbar, Footer, Floating Actions
│   │   ├── page.tsx     # Page 1: Home Page
│   │   ├── menu/        # Page 2: 110 Dishes Menu with Search & Filter
│   │   ├── about/       # Page 3: About Cafe & Kitchen Story
│   │   ├── delivery/    # Page 4: Zero-Fee Delivery & 50km Radius Checker
│   │   └── contact/     # Page 5: Table Booking & Contact Form
│   ├── components/
│   │   ├── Navbar.tsx   # Glassmorphic responsive top navigation
│   │   ├── Footer.tsx   # 4-Column footer with compliance & links
│   │   ├── FloatingActions.tsx # WhatsApp & Call floating buttons
│   │   └── Icons.tsx    # Standalone zero-dependency SVG icons
│   └── data/
│       └── menu.ts      # 110 items, 12 categories, prices, descriptions
├── next.config.ts       # Cloud deployment & images configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Scripts & dependencies
```

---

## 📞 Cafe Support
* **Address:** Shop No. 34, S.D Market, Kalka, Haryana - 133302
* **Phone:** +91 91385-28287
* **Delivery URL:** `https://ludhcloud.online/delivery/`
