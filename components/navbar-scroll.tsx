"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function NavbarScroll() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[oklch(0.9_0.012_155)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[oklch(0.54_0.155_162)] text-white text-xs font-bold flex-shrink-0 shadow-sm">
            S
          </span>
          <span
            className={[
              "text-[1.05rem] font-bold tracking-tight transition-colors font-display",
              scrolled ? "text-[oklch(0.15_0.028_240)]" : "text-white",
            ].join(" ")}
          >
            SmartApt
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {(["Fitur", "Harga", "Demo", "Tentang"] as const).map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={[
                "text-sm font-medium transition-colors hover:text-[oklch(0.54_0.155_162)]",
                scrolled
                  ? "text-[oklch(0.35_0.025_240)]"
                  : "text-white/80",
              ].join(" ")}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA group */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={[
              "hidden sm:inline-block text-sm font-medium transition-colors hover:text-[oklch(0.54_0.155_162)]",
              scrolled ? "text-[oklch(0.35_0.025_240)]" : "text-white/80",
            ].join(" ")}
          >
            Masuk
          </Link>
          <a
            href="#daftar"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[oklch(0.54_0.155_162)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[oklch(0.48_0.145_162)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.54_0.155_162)] focus-visible:ring-offset-2"
          >
            Mulai Gratis
          </a>
        </div>
      </div>
    </header>
  )
}
