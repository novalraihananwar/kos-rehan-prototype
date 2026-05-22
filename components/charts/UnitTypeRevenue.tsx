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
  { type: "Studio", revenue: 67500000, units: 27, color: "oklch(0.6 0.12 220)" },
  { type: "1BR", revenue: 121600000, units: 32, color: "oklch(0.65 0.14 290)" },
  { type: "2BR", revenue: 182000000, units: 35, color: "oklch(0.72 0.16 75)" },
  { type: "3BR", revenue: 135000000, units: 18, color: "oklch(0.54 0.155 162)" },
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
  payload?: Array<{ value: number; payload: { units: number; color: string } }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card ring-1 ring-foreground/10 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-medium mb-1">{label}</p>
      <p className="font-mono font-bold" style={{ color: payload[0].payload.color }}>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(payload[0].value)}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {payload[0].payload.units} unit
      </p>
    </div>
  )
}

export function UnitTypeRevenue() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={DATA} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 155)" vertical={false} />
        <XAxis
          dataKey="type"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-body)" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={v => idr(v)}
          tick={{ fontSize: 10, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-mono)" }}
          width={68}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.975 0.008 155)" }} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
          {DATA.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
