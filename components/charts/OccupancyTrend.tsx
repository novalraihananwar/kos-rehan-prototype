"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const DATA = [
  { month: "Des 25", rate: 87.2 },
  { month: "Jan 26", rate: 88.0 },
  { month: "Feb 26", rate: 89.5 },
  { month: "Mar 26", rate: 91.3 },
  { month: "Apr 26", rate: 92.8 },
  { month: "Mei 26", rate: 93.5 },
]

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card ring-1 ring-foreground/10 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
      <p className="font-mono font-bold text-[var(--emerald)]">{payload[0].value.toFixed(1)}%</p>
    </div>
  )
}

export function OccupancyTrend() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 155)" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-body)" }}
        />
        <YAxis
          domain={[80, 100]}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `${v}%`}
          tick={{ fontSize: 10, fill: "oklch(0.48 0.022 240)", fontFamily: "var(--font-mono)" }}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={90}
          stroke="oklch(0.54 0.155 162)"
          strokeDasharray="4 3"
          strokeOpacity={0.4}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="oklch(0.54 0.155 162)"
          strokeWidth={2.5}
          dot={{ fill: "oklch(0.54 0.155 162)", r: 4, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, fill: "oklch(0.54 0.155 162)", stroke: "#fff", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
