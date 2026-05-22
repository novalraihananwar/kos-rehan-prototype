import Link from "next/link"
import { NavbarScroll } from "@/components/navbar-scroll"

// ─── tiny SVG helpers (inline, zero-dependency) ─────────────────────────────

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h18M3 15h6" />
    </svg>
  )
}
function IconZap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
function IconQr({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h.01M14 17h3M17 14v7M21 14h.01M21 17h.01" />
      <path d="M5 5h3v3H5zM16 5h3v3h-3zM5 16h3v3H5z" fill="currentColor" stroke="none" opacity=".5"/>
    </svg>
  )
}
function IconWrench({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
    </svg>
  )
}
function IconMessageCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconBarChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconScan({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  )
}

// ─── Dashboard Mockup ────────────────────────────────────────────────────────

function DashboardMockup() {
  const units = [
    { id: "A1-01", tenant: "Budi S.", status: "paid", floor: 1 },
    { id: "A1-02", tenant: "Rina M.", status: "pending", floor: 1 },
    { id: "A1-03", tenant: "—", status: "vacant", floor: 1 },
    { id: "A1-04", tenant: "Hendra K.", status: "paid", floor: 1 },
    { id: "A2-01", tenant: "Dewi A.", status: "paid", floor: 2 },
    { id: "A2-02", tenant: "Fajar N.", status: "overdue", floor: 2 },
    { id: "A2-03", tenant: "Sari W.", status: "paid", floor: 2 },
    { id: "A2-04", tenant: "Toni R.", status: "pending", floor: 2 },
    { id: "A3-01", tenant: "Maya L.", status: "paid", floor: 3 },
    { id: "A3-02", tenant: "Arif D.", status: "paid", floor: 3 },
    { id: "A3-03", tenant: "Nina S.", status: "paid", floor: 3 },
    { id: "A3-04", tenant: "—", status: "vacant", floor: 3 },
  ] as const

  const statusStyle = {
    paid: { dot: "bg-[oklch(0.54_0.155_162)]", text: "text-[oklch(0.54_0.155_162)]", label: "Lunas" },
    pending: { dot: "bg-[oklch(0.72_0.16_75)]", text: "text-[oklch(0.58_0.16_75)]", label: "Pending" },
    overdue: { dot: "bg-[oklch(0.62_0.19_25)]", text: "text-[oklch(0.52_0.19_25)]", label: "Telat" },
    vacant: { dot: "bg-[oklch(0.7_0.01_240)]", text: "text-[oklch(0.55_0.02_240)]", label: "Kosong" },
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_oklch(0_0_0/0.5)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[oklch(0.19_0.03_240)] border-b border-white/8">
        <span className="h-3 w-3 rounded-full bg-[oklch(0.62_0.19_25)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.72_0.16_75)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.54_0.155_162)]" />
        <span className="ml-3 text-[11px] text-white/30 font-mono tracking-wide">smartapt.id/dashboard</span>
      </div>

      <div className="bg-[oklch(0.17_0.028_240)] flex">
        {/* Sidebar */}
        <aside className="hidden sm:flex w-52 flex-col gap-1 border-r border-white/8 p-3 shrink-0">
          <div className="px-3 py-2 rounded-lg bg-[oklch(0.54_0.155_162/0.15)] text-[oklch(0.72_0.14_162)] text-xs font-semibold">
            Dasbor
          </div>
          {["Unit & Kamar", "Penghuni", "Pembayaran", "Maintenance", "Laporan"].map((item) => (
            <div key={item} className="px-3 py-2 rounded-lg text-white/40 text-xs hover:text-white/60 transition-colors">
              {item}
            </div>
          ))}
          <div className="mt-auto pt-4 border-t border-white/8">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-6 w-6 rounded-full bg-[oklch(0.54_0.155_162)] flex items-center justify-center text-[9px] font-bold text-white">A</div>
              <div>
                <div className="text-[10px] text-white/70 font-medium">Apartemen Griya</div>
                <div className="text-[9px] text-white/30">Admin</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 min-w-0">
          {/* Top stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Total Unit", value: "248", sub: "+3 bulan ini", color: "text-white" },
              { label: "Penghuni Aktif", value: "231", sub: "93% terisi", color: "text-[oklch(0.72_0.14_162)]" },
              { label: "Tagihan Bulan Ini", value: "Rp 138jt", sub: "86% terkumpul", color: "text-[oklch(0.72_0.14_162)]" },
              { label: "Tiket Aktif", value: "7", sub: "2 urgent", color: "text-[oklch(0.72_0.16_75)]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-[oklch(0.21_0.03_240)] p-3 border border-white/6">
                <div className="text-[10px] text-white/40 mb-1">{stat.label}</div>
                <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] text-white/30 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Unit grid */}
          <div className="rounded-xl bg-[oklch(0.21_0.03_240)] border border-white/6 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white/70">Status Unit — Lantai 1–3</span>
              <div className="flex gap-1.5">
                {(["Semua", "Lunas", "Pending", "Kosong"] as const).map((f, i) => (
                  <span key={f} className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${i === 0 ? "bg-[oklch(0.54_0.155_162/0.2)] text-[oklch(0.72_0.14_162)]" : "text-white/30"}`}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {units.map((unit) => {
                const s = statusStyle[unit.status]
                return (
                  <div key={unit.id} className="rounded-lg bg-[oklch(0.19_0.028_240)] p-2.5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-semibold text-white/60">{unit.id}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    </div>
                    <div className="text-[10px] text-white/40 truncate">{unit.tenant}</div>
                    <div className={`text-[9px] font-medium mt-1 ${s.text}`}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── QR Card Visual ──────────────────────────────────────────────────────────

function QRCardMockup() {
  return (
    <div className="relative mx-auto w-[320px]">
      {/* Shadow card behind */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[290px] h-[175px] rounded-2xl opacity-40"
        style={{ background: "oklch(0.54 0.155 162)", filter: "blur(20px)" }}
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden w-[320px] h-[185px] p-5 flex flex-col justify-between"
        style={{
          background: "linear-gradient(135deg, oklch(0.22 0.04 240) 0%, oklch(0.18 0.055 220) 100%)",
          border: "1px solid oklch(1 0 0 / 0.12)",
          boxShadow: "0 20px 60px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[oklch(0.54_0.155_162)] text-white text-[8px] font-bold">S</span>
              <span className="text-white/90 text-xs font-bold tracking-wide font-display">SmartApt</span>
            </div>
            <p className="text-white/40 text-[9px] mt-0.5 font-mono tracking-widest">KARTU PENGHUNI</p>
          </div>

          {/* QR code pattern */}
          <div className="relative">
            <div
              className="w-[62px] h-[62px] rounded-lg p-1.5"
              style={{
                background: "white",
                boxShadow: "0 2px 8px oklch(0 0 0 / 0.4)",
              }}
            >
              {/* Realistic-looking QR code using SVG rects */}
              <svg viewBox="0 0 21 21" className="w-full h-full" shapeRendering="crispEdges">
                {/* Finder patterns */}
                <rect x="0" y="0" width="7" height="7" rx="0.8" fill="#111" />
                <rect x="1" y="1" width="5" height="5" rx="0.4" fill="white" />
                <rect x="2" y="2" width="3" height="3" fill="#111" />
                <rect x="14" y="0" width="7" height="7" rx="0.8" fill="#111" />
                <rect x="15" y="1" width="5" height="5" rx="0.4" fill="white" />
                <rect x="16" y="2" width="3" height="3" fill="#111" />
                <rect x="0" y="14" width="7" height="7" rx="0.8" fill="#111" />
                <rect x="1" y="15" width="5" height="5" rx="0.4" fill="white" />
                <rect x="2" y="16" width="3" height="3" fill="#111" />
                {/* Data modules — random-looking pattern */}
                {[
                  [9,0],[10,0],[11,0],[12,0],
                  [9,2],[11,2],[12,2],
                  [8,3],[10,3],[12,3],[13,3],
                  [9,4],[11,4],
                  [8,5],[10,5],[11,5],[12,5],[13,5],
                  [9,6],[12,6],
                  [0,8],[2,8],[4,8],[6,8],[8,8],[9,8],[11,8],[13,8],[15,8],[17,8],[19,8],[20,8],
                  [1,9],[3,9],[7,9],[10,9],[12,9],[14,9],[16,9],[18,9],[20,9],
                  [0,10],[2,10],[4,10],[8,10],[10,10],[13,10],[15,10],[17,10],[19,10],
                  [1,11],[5,11],[7,11],[9,11],[11,11],[14,11],[16,11],[18,11],[20,11],
                  [0,12],[3,12],[6,12],[8,12],[10,12],[12,12],[15,12],[17,12],
                  [1,13],[4,13],[7,13],[9,13],[11,13],[13,13],[16,13],[19,13],
                  [0,14],[2,14],[5,14],[8,14],[10,14],[13,14],[15,14],[17,14],[20,14],
                  [1,15],[3,15],[6,15],[9,15],[12,15],[14,15],[16,15],[18,15],
                  [0,16],[4,16],[7,16],[10,16],[13,16],[15,16],[17,16],[19,16],
                  [2,17],[5,17],[8,17],[11,17],[14,17],[16,17],[18,17],[20,17],
                  [1,18],[3,18],[6,18],[9,18],[12,18],[15,18],[17,18],
                  [0,19],[4,19],[7,19],[10,19],[13,19],[16,19],[19,19],
                  [2,20],[5,20],[8,20],[11,20],[14,20],[17,20],[20,20],
                ].map(([x, y]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Tenant info */}
        <div>
          <div className="text-white/90 font-semibold text-sm font-display">Budi Santoso</div>
          <div className="flex items-center gap-3 mt-1">
            <div>
              <div className="text-white/30 text-[9px] uppercase tracking-widest">Unit</div>
              <div className="text-white/80 text-xs font-mono font-semibold">A2-14</div>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <div className="text-white/30 text-[9px] uppercase tracking-widest">Lantai</div>
              <div className="text-white/80 text-xs font-mono font-semibold">2</div>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <div className="text-white/30 text-[9px] uppercase tracking-widest">ID</div>
              <div className="text-[oklch(0.72_0.14_162)] text-xs font-mono font-semibold">SA-08291</div>
            </div>
          </div>
        </div>

        {/* Decorative shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.54 0.155 162 / 0.4), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

type PricingTier = {
  name: string
  price: string
  period: string
  units: string
  description: string
  features: string[]
  cta: string
  featured: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Rp 299.000",
    period: "/bulan",
    units: "Hingga 50 unit",
    description: "Untuk kompleks kecil yang baru mulai digitalisasi.",
    features: [
      "Manajemen hingga 50 unit",
      "Portal penghuni (QR card)",
      "Pembayaran & invoice otomatis",
      "WhatsApp reminder dasar",
      "Laporan bulanan",
      "Support via email",
    ],
    cta: "Mulai Gratis 14 Hari",
    featured: false,
  },
  {
    name: "Pro",
    price: "Rp 599.000",
    period: "/bulan",
    units: "Hingga 200 unit",
    description: "Untuk apartemen skala menengah dengan kebutuhan lengkap.",
    features: [
      "Manajemen hingga 200 unit",
      "Portal penghuni (QR card) + cetak batch",
      "Smart payment + rekonsiliasi otomatis",
      "WhatsApp blast & notifikasi custom",
      "Sistem maintenance & work order",
      "Laporan keuangan + ekspor Excel",
      "Multi-admin dengan role",
      "Priority support",
    ],
    cta: "Mulai Gratis 14 Hari",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    units: "Tidak terbatas",
    description: "Untuk grup properti besar dengan kebutuhan spesifik.",
    features: [
      "Unit tidak terbatas",
      "Onboarding & migrasi data",
      "Custom domain & branding",
      "API access & integrasi pihak ketiga",
      "SLA 99,9% uptime",
      "Dedicated account manager",
      "Pelatihan tim on-site",
      "Kontrak tahunan fleksibel",
    ],
    cta: "Hubungi Kami",
    featured: false,
  },
]

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <NavbarScroll />

      <main className="scroll-smooth">

        {/* ── 1. HERO ───────────────────────────────────────────────── */}
        <section
          id="hero"
          className="bg-[var(--slate-hero)] pt-24 pb-16 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Eyebrow */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.54_0.155_162/0.35)] bg-[oklch(0.54_0.155_162/0.1)] px-3.5 py-1.5 text-xs font-semibold text-[oklch(0.72_0.14_162)] tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.54_0.155_162)] animate-pulse" />
                Platform Manajemen Apartemen #1
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-extrabold text-white leading-[1.07] tracking-tight max-w-3xl"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)" }}
            >
              Kelola Ratusan Unit<br />
              <span className="text-[oklch(0.66_0.14_162)]">dari Satu Dashboard</span>
            </h1>

            {/* Subtext + CTAs */}
            <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p className="text-[oklch(0.72_0.02_240)] leading-relaxed max-w-xl" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
                  SmartApt menggantikan spreadsheet, WhatsApp grup, dan proses manual dengan sistem digital terpadu. Dari sewa hingga maintenance, semua terhubung.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#daftar"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[oklch(0.54_0.155_162)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[oklch(0.48_0.145_162)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.54_0.155_162)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--slate-hero)]"
                  >
                    Coba Gratis 14 Hari
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#demo"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white/85 transition-colors hover:bg-white/8 hover:border-white/30 focus-visible:outline-none"
                  >
                    <IconScan className="h-4 w-4" />
                    Lihat Demo
                  </a>
                </div>

                {/* Stats row */}
                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
                  {[
                    { value: "200+", label: "Unit Dikelola" },
                    { value: "98%", label: "Tingkat Kepuasan" },
                    { value: "60%", label: "Waktu Admin Berkurang" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold font-mono text-white tabular-nums">{stat.value}</div>
                      <div className="text-xs text-[oklch(0.58_0.02_240)] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge — visible lg only */}
              <div className="hidden lg:flex items-center justify-end">
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "✓", text: "Setup dalam 30 menit" },
                    { icon: "✓", text: "Tanpa install aplikasi" },
                    { icon: "✓", text: "Data aman & terenkripsi" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-[oklch(0.65_0.02_240)]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[oklch(0.54_0.155_162/0.2)] text-[oklch(0.66_0.14_162)] text-xs font-bold flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-14 mx-auto max-w-7xl px-5 lg:px-8">
            <DashboardMockup />
          </div>
        </section>

        {/* ── 2. FITUR UTAMA ───────────────────────────────────────── */}
        <section id="fitur" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Section label */}
            <div className="mb-4">
              <span className="inline-block rounded-full bg-[oklch(0.97_0.04_162)] px-3.5 py-1 text-xs font-semibold text-[oklch(0.48_0.145_162)] tracking-wide uppercase">
                Fitur Utama
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 items-end mb-14">
              <h2
                className="font-display font-bold text-[oklch(0.15_0.028_240)] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
              >
                Semua yang Anda Butuhkan,<br />
                <span className="text-[oklch(0.48_0.145_162)]">Dalam Satu Platform</span>
              </h2>
              <p className="text-[oklch(0.42_0.02_240)] leading-relaxed lg:max-w-sm lg:ml-auto">
                Dirancang khusus untuk kompleks apartemen Indonesia — bukan adaptasi tools luar negeri.
              </p>
            </div>

            {/* Feature cards — varied layouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Card 1: Unit Management — full floor plan preview */}
              <div className="rounded-2xl border border-[oklch(0.9_0.012_155)] bg-white p-6 col-span-1 hover:shadow-[0_4px_24px_oklch(0.54_0.155_162/0.08)] transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.97_0.04_162)]">
                    <IconBuilding className="h-5 w-5 text-[oklch(0.48_0.145_162)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[oklch(0.15_0.028_240)] text-sm">Manajemen Unit</h3>
                    <p className="text-xs text-[oklch(0.5_0.02_240)]">Floor plan interaktif</p>
                  </div>
                </div>
                {/* Mini floor plan grid */}
                <div className="grid grid-cols-4 gap-1.5 mb-4">
                  {[
                    "paid","paid","vacant","paid",
                    "paid","overdue","paid","pending",
                    "vacant","paid","paid","paid",
                  ].map((s, i) => {
                    const colors: Record<string, string> = {
                      paid: "bg-[oklch(0.97_0.04_162)] border-[oklch(0.54_0.155_162/0.3)]",
                      overdue: "bg-[oklch(0.97_0.03_25)] border-[oklch(0.62_0.19_25/0.3)]",
                      pending: "bg-[oklch(0.98_0.03_85)] border-[oklch(0.72_0.16_75/0.3)]",
                      vacant: "bg-[oklch(0.97_0.008_155)] border-[oklch(0.88_0.01_155)]",
                    }
                    return (
                      <div
                        key={i}
                        className={`h-8 rounded-lg border text-[8px] font-mono flex items-center justify-center font-semibold ${colors[s]}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-3">
                  {[["Lunas","oklch(0.54_0.155_162)"],["Telat","oklch(0.62_0.19_25)"],["Kosong","oklch(0.6_0.01_240)"]].map(([label, c]) => (
                    <div key={label} className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full bg-[${c}]`} style={{ background: `oklch(${c.replace(/_/g," ")})` }} />
                      <span className="text-[10px] text-[oklch(0.5_0.02_240)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Smart Payment — invoice tracker */}
              <div className="rounded-2xl border border-[oklch(0.9_0.012_155)] bg-white p-6 hover:shadow-[0_4px_24px_oklch(0.54_0.155_162/0.08)] transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.98_0.04_75)]">
                      <IconZap className="h-5 w-5 text-[oklch(0.58_0.16_75)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[oklch(0.15_0.028_240)] text-sm">Smart Payment</h3>
                      <p className="text-xs text-[oklch(0.5_0.02_240)]">Auto-invoice & rekap</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[oklch(0.54_0.155_162)] bg-[oklch(0.97_0.04_162)] px-2 py-0.5 rounded-full">Nov 2025</span>
                </div>
                {/* Payment progress */}
                <div className="space-y-2.5">
                  {[
                    { label: "Sudah Dibayar", count: 198, total: 231, pct: 86 },
                    { label: "Menunggu", count: 24, total: 231, pct: 10 },
                    { label: "Terlambat", count: 9, total: 231, pct: 4 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-[oklch(0.4_0.02_240)] font-medium">{row.label}</span>
                        <span className="font-mono text-[oklch(0.35_0.025_240)] font-semibold">{row.count} unit</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[oklch(0.96_0.008_155)] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.pct}%`,
                            background: row.label === "Sudah Dibayar"
                              ? "oklch(0.54 0.155 162)"
                              : row.label === "Menunggu"
                              ? "oklch(0.72 0.16 75)"
                              : "oklch(0.62 0.19 25)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[oklch(0.94_0.01_155)] flex items-center justify-between">
                  <span className="text-[10px] text-[oklch(0.5_0.02_240)]">Total tagihan bulan ini</span>
                  <span className="text-sm font-bold font-mono text-[oklch(0.2_0.025_240)]">Rp 138.480.000</span>
                </div>
              </div>

              {/* Card 3: QR Portal — flagship, larger treatment */}
              <div className="rounded-2xl bg-[var(--slate-hero)] p-6 md:col-span-2 lg:col-span-1 hover:shadow-[0_4px_32px_oklch(0.54_0.155_162/0.18)] transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.54_0.155_162/0.2)]">
                    <IconQr className="h-5 w-5 text-[oklch(0.66_0.14_162)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">QR Tenant Portal</h3>
                    <p className="text-xs text-white/50">Flagship feature</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-[oklch(0.66_0.14_162)] border border-[oklch(0.54_0.155_162/0.35)] px-2 py-0.5 rounded-full">
                    Baru
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-5">
                  Penghuni scan kartu fisik → langsung masuk portal. Tanpa password, tanpa app.
                </p>
                {/* Mini flow */}
                <div className="flex items-center gap-2">
                  {[
                    { icon: "🪪", label: "Kartu fisik" },
                    { icon: "📱", label: "Scan QR" },
                    { icon: "🏠", label: "Portal aktif" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-lg">{step.icon}</div>
                        <span className="text-[9px] text-white/40">{step.label}</span>
                      </div>
                      {i < 2 && <span className="text-white/20 text-xs mb-3">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Maintenance */}
              <div className="rounded-2xl border border-[oklch(0.9_0.012_155)] bg-white p-6 hover:shadow-[0_4px_24px_oklch(0.54_0.155_162/0.08)] transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.97_0.03_25)] mb-4">
                  <IconWrench className="h-5 w-5 text-[oklch(0.52_0.19_25)]" />
                </div>
                <h3 className="font-semibold text-[oklch(0.15_0.028_240)] text-sm mb-1">Sistem Maintenance</h3>
                <p className="text-xs text-[oklch(0.5_0.02_240)] leading-relaxed mb-5">Work order digital, status real-time, histori lengkap per unit.</p>
                {/* Work order list */}
                <div className="space-y-2">
                  {[
                    { id: "#WO-0091", issue: "AC bocor — Unit B3-07", status: "Dikerjakan", color: "text-[oklch(0.58_0.16_75)] bg-[oklch(0.98_0.03_85)]" },
                    { id: "#WO-0090", issue: "Pompa air — Rooftop", status: "Selesai", color: "text-[oklch(0.48_0.145_162)] bg-[oklch(0.97_0.04_162)]" },
                    { id: "#WO-0089", issue: "Kunci rusak — A1-12", status: "Antrian", color: "text-[oklch(0.55_0.02_240)] bg-[oklch(0.96_0.008_155)]" },
                  ].map((wo) => (
                    <div key={wo.id} className="flex items-center gap-3 rounded-lg bg-[oklch(0.98_0.006_155)] p-2.5">
                      <span className="font-mono text-[9px] text-[oklch(0.55_0.02_240)]">{wo.id}</span>
                      <span className="flex-1 text-[10px] text-[oklch(0.3_0.02_240)] truncate">{wo.issue}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${wo.color}`}>{wo.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 5: WhatsApp Otomatis */}
              <div className="rounded-2xl border border-[oklch(0.9_0.012_155)] bg-white p-6 hover:shadow-[0_4px_24px_oklch(0.54_0.155_162/0.08)] transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.97_0.04_162)] mb-4">
                  <IconMessageCircle className="h-5 w-5 text-[oklch(0.48_0.145_162)]" />
                </div>
                <h3 className="font-semibold text-[oklch(0.15_0.028_240)] text-sm mb-1">WhatsApp Otomatis</h3>
                <p className="text-xs text-[oklch(0.5_0.02_240)] leading-relaxed mb-5">Reminder tagihan, konfirmasi pembayaran, notifikasi maintenance — otomatis tanpa ketik manual.</p>
                {/* Chat bubble preview */}
                <div className="space-y-2">
                  <div className="rounded-xl rounded-tl-sm bg-[oklch(0.97_0.04_162)] p-3 max-w-[85%]">
                    <p className="text-[10px] text-[oklch(0.3_0.02_240)] leading-relaxed">
                      Halo Budi! Tagihan sewa bulan <strong>Desember 2025</strong> sebesar <strong>Rp 3.500.000</strong> jatuh tempo 5 Desember. Bayar via link: smartapt.id/pay/...
                    </p>
                    <span className="text-[8px] text-[oklch(0.6_0.02_240)] mt-1 block">Terkirim otomatis · H-5</span>
                  </div>
                  <div className="rounded-xl rounded-tr-sm bg-[oklch(0.96_0.008_155)] p-3 max-w-[85%] ml-auto">
                    <p className="text-[10px] text-[oklch(0.3_0.02_240)]">Pembayaran Rp 3.500.000 diterima ✓</p>
                    <span className="text-[8px] text-[oklch(0.6_0.02_240)] mt-1 block">Konfirmasi otomatis</span>
                  </div>
                </div>
              </div>

              {/* Card 6: Laporan Keuangan — spans 2 cols on md */}
              <div className="rounded-2xl border border-[oklch(0.9_0.012_155)] bg-white p-6 md:col-span-2 lg:col-span-1 hover:shadow-[0_4px_24px_oklch(0.54_0.155_162/0.08)] transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.97_0.03_220)]">
                      <IconBarChart className="h-5 w-5 text-[oklch(0.5_0.12_220)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[oklch(0.15_0.028_240)] text-sm">Laporan Keuangan</h3>
                      <p className="text-xs text-[oklch(0.5_0.02_240)]">Revenue analytics</p>
                    </div>
                  </div>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1.5 h-20 mb-3">
                  {[62, 78, 71, 85, 90, 88, 95, 83, 91, 87, 96, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background: i === 11
                            ? "oklch(0.54 0.155 162)"
                            : i >= 9
                            ? "oklch(0.54 0.155 162 / 0.5)"
                            : "oklch(0.54 0.155 162 / 0.25)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[9px] text-[oklch(0.6_0.02_240)]">
                  <span>Jan</span><span>Mar</span><span>Mei</span><span>Jul</span><span>Sep</span><span>Nov</span><span className="text-[oklch(0.54_0.155_162)] font-semibold">Des</span>
                </div>
                <div className="mt-4 pt-3 border-t border-[oklch(0.94_0.01_155)] flex gap-6">
                  <div>
                    <div className="text-[9px] text-[oklch(0.55_0.02_240)]">YTD Revenue</div>
                    <div className="text-sm font-bold font-mono text-[oklch(0.2_0.025_240)]">Rp 1,48M</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[oklch(0.55_0.02_240)]">vs tahun lalu</div>
                    <div className="text-sm font-bold font-mono text-[oklch(0.48_0.145_162)]">+18,4%</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. QR CARD HIGHLIGHT ─────────────────────────────────── */}
        <section id="demo" className="bg-[var(--slate-hero)] py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — text */}
              <div>
                <div className="mb-5">
                  <span className="inline-block rounded-full border border-[oklch(0.54_0.155_162/0.4)] bg-[oklch(0.54_0.155_162/0.1)] px-3.5 py-1 text-xs font-semibold text-[oklch(0.72_0.14_162)] tracking-wide uppercase">
                    Flagship Feature
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-white leading-tight mb-5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  Penghuni Masuk Portal<br />
                  <span className="text-[oklch(0.66_0.14_162)]">Tanpa Password</span>
                </h2>

                <p className="text-[oklch(0.68_0.02_240)] leading-relaxed mb-8 max-w-lg">
                  Setiap penghuni mendapat kartu fisik dengan QR unik. Scan kartu &rarr; langsung ke portal mereka. Tagihan, riwayat pembayaran, ajukan komplain — tanpa install app, tanpa ingat password.
                </p>

                {/* Steps */}
                <div className="space-y-5">
                  {[
                    {
                      num: "1",
                      title: "Admin generate kartu",
                      desc: "Cetak batch kartu penghuni langsung dari dashboard — satu klik, ratusan kartu.",
                    },
                    {
                      num: "2",
                      title: "Berikan ke penghuni",
                      desc: "Kartu fisik ukuran KTP, tahan lama, dengan branding apartemen Anda.",
                    },
                    {
                      num: "3",
                      title: "Scan kapan saja",
                      desc: "Penghuni scan lewat kamera HP. Tidak perlu download app apapun.",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[oklch(0.54_0.155_162/0.4)] bg-[oklch(0.54_0.155_162/0.12)] text-[oklch(0.66_0.14_162)] text-sm font-bold font-mono">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{step.title}</h4>
                        <p className="text-xs text-[oklch(0.58_0.02_240)] mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#daftar"
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[oklch(0.54_0.155_162)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[oklch(0.48_0.145_162)]"
                  >
                    Coba Fitur Ini
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right — QR card visual */}
              <div className="flex flex-col items-center gap-8">
                <QRCardMockup />

                {/* Mobile portal preview */}
                <div className="w-[200px] rounded-2xl overflow-hidden border border-white/12 shadow-[0_16px_48px_oklch(0_0_0/0.4)]">
                  {/* Phone chrome */}
                  <div className="bg-[oklch(0.19_0.03_240)] px-3 pt-3 pb-2 border-b border-white/8">
                    <div className="flex justify-center mb-2">
                      <div className="h-1 w-10 rounded-full bg-white/20" />
                    </div>
                    <div className="text-[9px] text-white/30 font-mono text-center">portal.smartapt.id</div>
                  </div>
                  <div className="bg-[oklch(0.17_0.028_240)] p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-7 w-7 rounded-full bg-[oklch(0.54_0.155_162)] flex items-center justify-center text-white text-[9px] font-bold">B</div>
                      <div>
                        <div className="text-white/80 text-[10px] font-semibold">Halo, Budi!</div>
                        <div className="text-white/30 text-[8px]">Unit A2-14 · Lantai 2</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { label: "Tagihan", val: "Lunas", color: "text-[oklch(0.66_0.14_162)]" },
                        { label: "Kontrak", val: "8 bln", color: "text-white/60" },
                        { label: "Komplain", val: "0 aktif", color: "text-white/60" },
                        { label: "Histori", val: "Lihat →", color: "text-[oklch(0.66_0.14_162)]" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-white/5 p-2">
                          <div className="text-[8px] text-white/30">{item.label}</div>
                          <div className={`text-[10px] font-semibold mt-0.5 ${item.color}`}>{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. HARGA ─────────────────────────────────────────────── */}
        <section id="harga" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-[oklch(0.97_0.04_162)] px-3.5 py-1 text-xs font-semibold text-[oklch(0.48_0.145_162)] tracking-wide uppercase">
                Harga
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 items-end mb-12">
              <h2
                className="font-display font-bold text-[oklch(0.15_0.028_240)] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
              >
                Harga Transparan,<br />
                <span className="text-[oklch(0.48_0.145_162)]">Tanpa Biaya Tersembunyi</span>
              </h2>
              <div className="lg:text-right">
                {/* Annual toggle — static visual, no JS needed for landing */}
                <div className="inline-flex items-center gap-3 rounded-full bg-[oklch(0.97_0.008_155)] p-1 border border-[oklch(0.9_0.012_155)]">
                  <span className="rounded-full px-4 py-1.5 text-xs font-semibold text-[oklch(0.5_0.02_240)]">Bulanan</span>
                  <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[oklch(0.2_0.025_240)] shadow-sm">
                    Tahunan <span className="text-[oklch(0.48_0.145_162)]">2 bln gratis</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={[
                    "rounded-2xl p-7 flex flex-col",
                    tier.featured
                      ? "bg-[var(--slate-hero)] ring-2 ring-[oklch(0.54_0.155_162)] shadow-[0_8px_48px_oklch(0.54_0.155_162/0.2)] relative"
                      : "bg-white border border-[oklch(0.9_0.012_155)]",
                  ].join(" ")}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block rounded-full bg-[oklch(0.54_0.155_162)] px-4 py-1 text-[11px] font-bold text-white tracking-wide shadow-lg">
                        Paling Populer
                      </span>
                    </div>
                  )}

                  {/* Tier header */}
                  <div className="mb-6">
                    <h3 className={`font-display font-bold text-lg mb-1 ${tier.featured ? "text-white" : "text-[oklch(0.15_0.028_240)]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${tier.featured ? "text-white/55" : "text-[oklch(0.5_0.02_240)]"}`}>
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    <span className={`font-display font-extrabold tabular-nums ${tier.featured ? "text-white" : "text-[oklch(0.15_0.028_240)]"}`} style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className={`text-sm ml-1 ${tier.featured ? "text-white/50" : "text-[oklch(0.55_0.02_240)]"}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <div className={`text-xs mb-6 ${tier.featured ? "text-[oklch(0.66_0.14_162)]" : "text-[oklch(0.5_0.02_240)]"}`}>
                    {tier.units}
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <IconCheck
                          className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${tier.featured ? "text-[oklch(0.66_0.14_162)]" : "text-[oklch(0.54_0.155_162)]"}`}
                        />
                        <span className={`text-xs leading-relaxed ${tier.featured ? "text-white/70" : "text-[oklch(0.4_0.02_240)]"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#daftar"
                    className={[
                      "inline-flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2",
                      tier.featured
                        ? "bg-[oklch(0.54_0.155_162)] text-white hover:bg-[oklch(0.48_0.145_162)] focus-visible:ring-[oklch(0.54_0.155_162)]"
                        : "border border-[oklch(0.9_0.012_155)] text-[oklch(0.3_0.025_240)] hover:bg-[oklch(0.97_0.008_155)] focus-visible:ring-[oklch(0.54_0.155_162)]",
                    ].join(" ")}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <p className="mt-8 text-center text-xs text-[oklch(0.58_0.02_240)]">
              Semua paket termasuk SSL, backup harian, dan update fitur tanpa biaya tambahan. Batalkan kapan saja.
            </p>
          </div>
        </section>

        {/* ── 5. CTA SECTION ───────────────────────────────────────── */}
        <section
          id="daftar"
          className="py-24"
          style={{ background: "oklch(0.54 0.155 162)" }}
        >
          <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
            <h2
              className="font-display font-extrabold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
            >
              Siap Modernisasi Manajemen<br />Apartemen Anda?
            </h2>
            <p className="text-white/75 leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
              Bergabung dengan ratusan pengelola apartemen yang sudah beralih ke SmartApt. Setup 30 menit, hasil terasa hari pertama.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#daftar-form"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-[oklch(0.54_0.155_162)] transition-colors hover:bg-white/90 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.54_0.155_162)]"
              >
                Mulai Gratis 14 Hari
                <IconArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-white/50 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/70 focus-visible:outline-none"
              >
                Jadwalkan Demo
              </a>
            </div>

            <p className="mt-6 text-sm text-white/55">
              Tidak perlu kartu kredit &nbsp;&middot;&nbsp; Tanpa kontrak panjang &nbsp;&middot;&nbsp; Batalkan kapan saja
            </p>
          </div>
        </section>

        {/* ── 6. FOOTER ─────────────────────────────────────────────── */}
        <footer id="tentang" className="bg-[var(--slate-hero)] border-t border-white/8">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              {/* Brand col */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[oklch(0.54_0.155_162)] text-white text-xs font-bold">S</span>
                  <span className="text-white font-bold text-[1.05rem] font-display">SmartApt</span>
                </Link>
                <p className="text-sm text-white/45 leading-relaxed max-w-[220px]">
                  Platform manajemen apartemen modern untuk Indonesia.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Produk</h4>
                <ul className="space-y-2.5">
                  {["Fitur", "Harga", "Changelog", "Roadmap"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-white/45 hover:text-white/75 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perusahaan */}
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Perusahaan</h4>
                <ul className="space-y-2.5">
                  {["Tentang Kami", "Blog", "Karier", "Kontak"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-white/45 hover:text-white/75 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Legal</h4>
                <ul className="space-y-2.5">
                  {["Kebijakan Privasi", "Syarat & Ketentuan", "Keamanan Data"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-white/45 hover:text-white/75 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/30">
                &copy; 2025 SmartApt. Hak cipta dilindungi.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Bahasa:</span>
                <button className="text-xs text-white/55 hover:text-white/80 transition-colors font-medium">Indonesia</button>
                <span className="text-white/20">/</span>
                <button className="text-xs text-white/30 hover:text-white/55 transition-colors">English</button>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
