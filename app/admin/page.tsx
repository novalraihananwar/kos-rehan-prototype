import { Suspense } from 'react'
import {
  Building2,
  Users,
  CreditCard,
  Wrench,
  CircleCheck,
  CircleAlert,
  UserPlus,
  ArrowUpRight,
} from 'lucide-react'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { UnitStatusChart } from '@/components/charts/UnitStatusChart'

// ── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(date: Date) {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ── Mock data ──────────────────────────────────────────────────────────────

const recentActivity = [
  {
    id: 1,
    type: 'payment',
    icon: CircleCheck,
    iconColor: 'var(--emerald)',
    iconBg: 'oklch(0.54 0.155 162 / 0.12)',
    title: 'Pembayaran diterima',
    desc: 'Unit A-1204 · Budi Santoso',
    amount: formatCurrency(4_500_000),
    time: '5 menit lalu',
  },
  {
    id: 2,
    type: 'wo',
    icon: Wrench,
    iconColor: 'oklch(0.6 0.16 75)',
    iconBg: 'oklch(0.72 0.16 75 / 0.12)',
    title: 'Work Order dibuka',
    desc: 'Unit B-0803 · AC tidak dingin',
    amount: null,
    time: '22 menit lalu',
  },
  {
    id: 3,
    type: 'tenant',
    icon: UserPlus,
    iconColor: 'oklch(0.6 0.12 220)',
    iconBg: 'oklch(0.6 0.12 220 / 0.12)',
    title: 'Penghuni baru masuk',
    desc: 'Unit C-0501 · Rina Kartika',
    amount: null,
    time: '1 jam lalu',
  },
  {
    id: 4,
    type: 'payment',
    icon: CircleCheck,
    iconColor: 'var(--emerald)',
    iconBg: 'oklch(0.54 0.155 162 / 0.12)',
    title: 'Pembayaran diterima',
    desc: 'Unit D-1102 · Hendra Wijaya',
    amount: formatCurrency(5_200_000),
    time: '2 jam lalu',
  },
  {
    id: 5,
    type: 'wo',
    icon: CircleAlert,
    iconColor: 'oklch(0.62 0.19 25)',
    iconBg: 'oklch(0.62 0.19 25 / 0.1)',
    title: 'WO Urgent ditandai',
    desc: 'Unit A-0204 · Bocor atap',
    amount: null,
    time: '3 jam lalu',
  },
  {
    id: 6,
    type: 'payment',
    icon: CircleCheck,
    iconColor: 'var(--emerald)',
    iconBg: 'oklch(0.54 0.155 162 / 0.12)',
    title: 'Pembayaran diterima',
    desc: 'Unit B-0612 · Siti Rahayu',
    amount: formatCurrency(4_800_000),
    time: 'Kemarin 18:34',
  },
]

const overduePayments = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    unit: 'A-0304',
    amount: 4_500_000,
    daysOverdue: 12,
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    unit: 'C-0706',
    amount: 5_200_000,
    daysOverdue: 8,
  },
  {
    id: 3,
    name: 'Rizky Pratama',
    unit: 'B-1001',
    amount: 4_800_000,
    daysOverdue: 7,
  },
  {
    id: 4,
    name: 'Melati Sari',
    unit: 'D-0203',
    amount: 5_500_000,
    daysOverdue: 5,
  },
  {
    id: 5,
    name: 'Budi Raharjo',
    unit: 'A-0812',
    amount: 4_200_000,
    daysOverdue: 3,
  },
]

// ── KPI Card ───────────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  value,
  valueFont,
  sub,
  subColor,
}: {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  value: string
  valueFont?: string
  sub: string
  subColor?: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div
          className="flex items-center justify-center size-9 rounded-lg shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="size-4" style={{ color: iconColor }} />
        </div>
      </div>
      <div>
        <p
          className="text-3xl font-bold text-foreground leading-none"
          style={valueFont ? { fontFamily: valueFont } : undefined}
        >
          {value}
        </p>
        <p
          className="mt-1.5 text-xs font-medium"
          style={{ color: subColor ?? 'var(--muted-foreground)' }}
        >
          {sub}
        </p>
      </div>
    </div>
  )
}

// ── Chart skeleton ─────────────────────────────────────────────────────────

function ChartSkeleton() {
  return <div className="skeleton h-full w-full rounded-lg" />
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const today = new Date(2026, 4, 22) // 22 May 2026

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {formatDate(today)}
          </p>
        </div>
        <div
          className="rounded-lg px-3.5 py-2 text-sm font-medium"
          style={{
            backgroundColor: 'oklch(0.54 0.155 162 / 0.1)',
            color: 'var(--emerald)',
          }}
        >
          Selamat pagi, Admin
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          icon={Building2}
          iconBg="oklch(0.54 0.155 162 / 0.12)"
          iconColor="var(--emerald)"
          title="Total Unit"
          value="247"
          sub="+3 baru bulan ini"
          subColor="var(--emerald)"
        />
        <KpiCard
          icon={Users}
          iconBg="oklch(0.6 0.12 220 / 0.12)"
          iconColor="oklch(0.6 0.12 220)"
          title="Penghuni Aktif"
          value="231"
          sub="94% hunian"
          subColor="oklch(0.6 0.12 220)"
        />
        <KpiCard
          icon={CreditCard}
          iconBg="oklch(0.54 0.155 162 / 0.12)"
          iconColor="var(--emerald)"
          title="Pendapatan Bulan Ini"
          value="Rp 486,5 Jt"
          valueFont="var(--font-mono)"
          sub="+8% vs bulan lalu"
          subColor="var(--emerald)"
        />
        <KpiCard
          icon={Wrench}
          iconBg="oklch(0.72 0.16 75 / 0.12)"
          iconColor="oklch(0.6 0.16 75)"
          title="Work Order Pending"
          value="12"
          sub="4 urgent"
          subColor="oklch(0.62 0.19 25)"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Revenue chart — 3/5 */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Pendapatan 6 Bulan Terakhir
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Jan – Jun 2026 (dalam jutaan)
              </p>
            </div>
            <span className="badge-paid">+8% YoY</span>
          </div>
          <div className="h-52">
            <Suspense fallback={<ChartSkeleton />}>
              <RevenueChart />
            </Suspense>
          </div>
        </div>

        {/* Unit status donut — 2/5 */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">Status Unit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">247 unit total</p>
          </div>
          <div className="h-52">
            <Suspense fallback={<ChartSkeleton />}>
              <UnitStatusChart />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Aktivitas Terbaru
            </h2>
            <button
              className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--emerald)' }}
            >
              Lihat semua
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
          <ul className="divide-y divide-border">
            {recentActivity.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3.5 px-6 py-3.5 hover:bg-muted/40 transition-colors"
                >
                  <div
                    className="flex items-center justify-center size-8 rounded-lg shrink-0 mt-0.5"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {item.amount && (
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--emerald)',
                        }}
                      >
                        {item.amount}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Overdue payments */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Pembayaran Jatuh Tempo
            </h2>
            <button
              className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--emerald)' }}
            >
              Lihat semua
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Penghuni
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Unit
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Jumlah
                  </th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Terlambat
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {overduePayments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-foreground leading-snug">
                        {p.name}
                      </p>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="badge-vacant">{p.unit}</span>
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <span
                        className="text-sm font-semibold text-foreground tabular-nums"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {formatCurrency(p.amount)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={p.daysOverdue >= 10 ? 'badge-overdue' : 'badge-pending'}
                      >
                        {p.daysOverdue} hari
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        style={{
                          backgroundColor: 'oklch(0.54 0.155 162 / 0.1)',
                          color: 'var(--emerald)',
                        }}
                      >
                        Tagih
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
