'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 412 },
  { month: 'Feb', revenue: 438 },
  { month: 'Mar', revenue: 425 },
  { month: 'Apr', revenue: 461 },
  { month: 'Mei', revenue: 448 },
  { month: 'Jun', revenue: 487 },
]

function formatRevenue(value: number) {
  return `Rp ${value}M`
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2.5 text-sm">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
        Rp {(payload[0].value * 1_000_000).toLocaleString('id-ID')}
      </p>
    </div>
  )
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={revenueData}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <defs>
          <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.54 0.155 162)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="oklch(0.54 0.155 162)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0.9 0.012 155)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'oklch(0.48 0.022 240)' }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          tickFormatter={formatRevenue}
          tick={{ fontSize: 11, fill: 'oklch(0.48 0.022 240)' }}
          axisLine={false}
          tickLine={false}
          domain={['dataMin - 20', 'dataMax + 20']}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'oklch(0.54 0.155 162)', strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="oklch(0.54 0.155 162)"
          strokeWidth={2}
          fill="url(#emeraldGradient)"
          dot={false}
          activeDot={{ r: 5, fill: 'oklch(0.54 0.155 162)', stroke: 'white', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
