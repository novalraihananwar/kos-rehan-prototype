"use client"

import { useState } from "react"

const PERIODS = [
  { label: "Bulan Ini", value: "1m" },
  { label: "3 Bulan", value: "3m" },
  { label: "6 Bulan", value: "6m" },
  { label: "1 Tahun", value: "1y" },
]

export function PeriodSelector() {
  const [active, setActive] = useState("6m")

  return (
    <div className="flex items-center rounded-lg border border-input overflow-hidden bg-card">
      {PERIODS.map(p => (
        <button
          key={p.value}
          onClick={() => setActive(p.value)}
          className={`px-3 h-8 text-sm transition-colors ${
            active === p.value
              ? "bg-[var(--emerald)] text-white font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
