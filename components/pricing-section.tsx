"use client"

import { useState } from "react"
import Link from "next/link"

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

const TIERS = {
  monthly: [
    {
      name: "Starter",
      price: "Rp 299.000",
      priceNum: 299000,
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
      href: "/login",
      featured: false,
    },
    {
      name: "Pro",
      price: "Rp 599.000",
      priceNum: 599000,
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
      href: "/login",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceNum: 0,
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
      href: "https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20Enterprise%20SmartApt",
      featured: false,
    },
  ],
  annual: [
    {
      name: "Starter",
      price: "Rp 249.000",
      priceNum: 249000,
      period: "/bulan",
      units: "Hingga 50 unit • Hemat Rp 600.000/tahun",
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
      href: "/login",
      featured: false,
    },
    {
      name: "Pro",
      price: "Rp 499.000",
      priceNum: 499000,
      period: "/bulan",
      units: "Hingga 200 unit • Hemat Rp 1.200.000/tahun",
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
      href: "/login",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceNum: 0,
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
      href: "https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20Enterprise%20SmartApt",
      featured: false,
    },
  ],
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const tiers = annual ? TIERS.annual : TIERS.monthly

  return (
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

          {/* Annual/Monthly toggle — FUNCTIONAL */}
          <div className="lg:text-right">
            <div className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.97_0.008_155)] p-1 border border-[oklch(0.9_0.012_155)]">
              <button
                onClick={() => setAnnual(false)}
                className={[
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                  !annual
                    ? "bg-white text-[oklch(0.2_0.025_240)] shadow-sm"
                    : "text-[oklch(0.5_0.02_240)] hover:text-[oklch(0.3_0.025_240)]",
                ].join(" ")}
              >
                Bulanan
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={[
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                  annual
                    ? "bg-white text-[oklch(0.2_0.025_240)] shadow-sm"
                    : "text-[oklch(0.5_0.02_240)] hover:text-[oklch(0.3_0.025_240)]",
                ].join(" ")}
              >
                Tahunan{" "}
                <span className={annual ? "text-[oklch(0.48_0.145_162)]" : "text-[oklch(0.54_0.155_162)]"}>
                  2 bln gratis
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                "rounded-2xl p-7 flex flex-col transition-all",
                tier.featured
                  ? "bg-[oklch(0.15_0.028_240)] ring-2 ring-[oklch(0.54_0.155_162)] shadow-[0_8px_48px_oklch(0.54_0.155_162/0.2)] relative"
                  : "bg-white border border-[oklch(0.9_0.012_155)] hover:border-[oklch(0.8_0.02_155)] hover:shadow-md",
              ].join(" ")}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-[oklch(0.54_0.155_162)] px-4 py-1 text-[11px] font-bold text-white tracking-wide shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display font-bold text-lg mb-1 ${tier.featured ? "text-white" : "text-[oklch(0.15_0.028_240)]"}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs leading-relaxed ${tier.featured ? "text-white/55" : "text-[oklch(0.5_0.02_240)]"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-1">
                <span
                  className={`font-display font-extrabold tabular-nums transition-all ${tier.featured ? "text-white" : "text-[oklch(0.15_0.028_240)]"}`}
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
                >
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

              <Link
                href={tier.href}
                className={[
                  "inline-flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2",
                  tier.featured
                    ? "bg-[oklch(0.54_0.155_162)] text-white hover:bg-[oklch(0.48_0.145_162)] focus-visible:ring-[oklch(0.54_0.155_162)]"
                    : "border border-[oklch(0.9_0.012_155)] text-[oklch(0.3_0.025_240)] hover:bg-[oklch(0.97_0.008_155)] focus-visible:ring-[oklch(0.54_0.155_162)]",
                ].join(" ")}
              >
                {tier.cta}
                {tier.name !== "Enterprise" && <IconArrowRight className="h-3.5 w-3.5" />}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[oklch(0.58_0.02_240)]">
          Semua paket termasuk SSL, backup harian, dan update fitur tanpa biaya tambahan. Batalkan kapan saja.
        </p>
      </div>
    </section>
  )
}
