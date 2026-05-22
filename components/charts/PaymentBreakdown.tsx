"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const DATA = [
  { name: "Transfer", value: 58, color: "oklch(0.54 0.155 162)" },
  { name: "QRIS", value: 32, color: "oklch(0.6 0.12 220)" },
  { name: "Cash", value: 10, color: "oklch(0.72 0.16 75)" },
]

function CustomTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: { color: string } }>
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card ring-1 ring-foreground/10 rounded-lg px-3 py-2 shadow-lg text-sm">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ background: payload[0].payload.color }} />
        <span className="font-medium">{payload[0].name}</span>
      </div>
      <p className="font-mono font-bold mt-0.5">{payload[0].value}%</p>
    </div>
  )
}

function CustomLegend() {
  return (
    <div className="flex flex-col gap-2 justify-center pl-4">
      {DATA.map(d => (
        <div key={d.name} className="flex items-center gap-2 text-sm">
          <span className="size-3 rounded-full shrink-0" style={{ background: d.color }} />
          <span className="text-muted-foreground">{d.name}</span>
          <span className="font-mono font-bold ml-auto">{d.value}%</span>
        </div>
      ))}
    </div>
  )
}

export function PaymentBreakdown() {
  return (
    <div className="flex items-center gap-2 h-[240px]">
      <ResponsiveContainer width="60%" height="100%">
        <PieChart>
          <Pie
            data={DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {DATA.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex-1">
        <CustomLegend />
      </div>
    </div>
  )
}
