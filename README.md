# ZUNOON 2026 — Official Freshers Fest Portal
### Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchillpill999%2Fzunoon-2026&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_FEST_NAME,NEXT_PUBLIC_FEST_TYPE,NEXT_PUBLIC_INSTITUTION,NEXT_PUBLIC_LOCATION,NEXT_PUBLIC_TAGLINE,NEXT_PUBLIC_REGISTRATION_TYPE&envDescription=Production%20environment%20variables%20for%20ZUNOON%202026)

> **"A New Chapter. One Campus. Endless Memories."**  
> Official portal for **ZUNOON 2026**, the grand annual college freshers welcome festival of **Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra, Bihar**.

---

## 🎪 Features

- **Cinematic Interactive Entry Screen:** Black canvas with floating Devanagari typography, multi-layer depth blur, atmospheric drift animations, and a tactile "CLICK TO ENTER" button.
- **Scroll-Scrubbed Video Odyssey:** High-energy festival footage scrubbing with synchronized music milestones ("HORN OK PLEASE" and "SAFAR LNJPIT VERSE").
- **Interactive 3D Album Cube:** 6 vector-rendered theme faces rotatable 360° via touch and pointer gestures with zero photo clutter.
- **100% Free Pass Generation:** Instant digital attendance pass generator with dynamic high-contrast SVG QR codes.
- **Gate QR Scanner (`/scan`):** Mobile-optimized camera scanner built for student volunteers at the campus gate with real-time validation and audio feedback.
- **Supabase Cloud Persistence:** Ultra-low latency database storage (`astitva-2k26`, Mumbai `ap-south-1` region) with Postgres RLS security policies.
- **Fully Mobile Optimized:** Touch latency eliminated (`touch-action: manipulation`), dynamic viewport units (`100dvh`), iOS Safari auto-zoom prevention (`text-base sm:text-sm`), and responsive mobile drawer navigation.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + Retro Pop-Art Comic aesthetic
- **Animations:** [GSAP 3](https://greensock.com/gsap) + Hardware-accelerated CSS Keyframes
- **Database:** [Supabase](https://supabase.com) PostgreSQL (`zunoon_registrations`)
- **Typography:** Carter One, Chewy, Space Grotesk, Rozha One, Yatra One (Devanagari)
- **Icons:** [Lucide React](https://lucide.dev)

---

## 🚀 One-Click Deployment to Vercel

1. Click the **Deploy with Vercel** button above or import [`chillpill999/zunoon-2026`](https://github.com/chillpill999/zunoon-2026) in your [Vercel Dashboard](https://vercel.com/new).
2. Configure the following Production Environment Variables:

| Variable Name | Example / Production Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://gqtcpbllllaewzwqcyun.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Your Supabase anon public key)* |
| `NEXT_PUBLIC_FEST_NAME` | `ZUNOON` |
| `NEXT_PUBLIC_FEST_TYPE` | `College Freshers Fest` |
| `NEXT_PUBLIC_INSTITUTION` | `Loknayak Jai Prakash Institute of Technology (LNJPIT)` |
| `NEXT_PUBLIC_LOCATION` | `Chapra, Bihar` |
| `NEXT_PUBLIC_TAGLINE` | `A New Chapter. One Campus. Endless Memories.` |
| `NEXT_PUBLIC_REGISTRATION_TYPE` | `FREE` |

3. Click **Deploy**. Vercel will automatically build and publish your global production site with free automated SSL.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/chillpill999/zunoon-2026.git
cd zunoon-2026

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧭 Routes

- `/` — Main Homepage & Interactive Festival Experience
- `/pass` — Digital Pass Viewer (retrieves pass stored on device)
- `/scan` — Gate Volunteer Scanner (live camera QR reader)
- `/api/register` — Supabase registration endpoint with admittance ID generator

---

## 📜 Credits

- **Organized by:** LNJPIT Student Council & Cultural Council, Chapra
- **Engineering Departments:** CSE, CE, ME, EEE, FPP, M&C
- **Attribution:** Made with ❤️ of [hothlali department](https://www.instagram.com/hothlali_department/)
