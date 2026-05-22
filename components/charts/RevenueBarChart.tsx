"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const DATA = [
  { month: "Des 25", revenue: 438000000 },
  { month: "Jan 26", revenue: 452000000 },
  { month: "Feb 26", revenue: 461000000 },
  { month: "Mar 26", revenue: 475000000 },
  { month: "Apr 26", revenue: 490000000 },
  { month: "Mei 26", revenue: 504700000 },
]

const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n)

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card ring-1 ring-foreground/10 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
      <p className="font-mono font-bold text-[var(--emerald)]">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(payload[0].value)}
      </p>
    </div>
  )
}

export function RevenueBarChart() {
  const maxVal = Math.max(...DATA.map(d => d.revenue))

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={DATA} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 155)" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-body)" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={v => idr(v)}
          tick={{ fontSize: 10, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-mono)" }}
          width={72}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.975 0.008 155)" }} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
          {DATA.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.revenue === maxVal ? "oklch(0.54 0.155 162)" : "oklch(0.78 0.1 162)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
