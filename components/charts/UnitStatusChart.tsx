'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const unitData = [
  { name: 'Terisi', value: 189, color: 'oklch(0.54 0.155 162)' },
  { name: 'Kosong', value: 42, color: 'oklch(0.72 0.16 75)' },
  { name: 'Maintenance', value: 16, color: 'oklch(0.62 0.19 25)' },
]

const total = unitData.reduce((s, d) => s + d.value, 0)

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number; payload: { color: string } }[]
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="size-2.5 rounded-full shrink-0"
          style={{ backgroundColor: item.payload.color }}
        />
        <span className="text-muted-foreground">{item.name}</span>
      </div>
      <p className="font-semibold text-foreground pl-[18px]" style={{ fontFamily: 'var(--font-mono)' }}>
        {item.value} unit ({((item.value / total) * 100).toFixed(1)}%)
      </p>
    </div>
  )
}

function CustomLegend() {
  return (
    <div className="flex flex-col gap-2.5 mt-2">
      {unitData.map((item) => (
        <div key={item.name} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground truncate">{item.name}</span>
          </div>
          <span
            className="text-sm font-semibold text-foreground tabular-nums shrink-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function UnitStatusChart() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={unitData}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {unitData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  )
}
