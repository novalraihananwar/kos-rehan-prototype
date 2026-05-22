import { Suspense } from "react"
import { Download, TrendingUp, TrendingDown, Building2, Wallet, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevenueBarChart } from "@/components/charts/RevenueBarChart"
import { OccupancyTrend } from "@/components/charts/OccupancyTrend"
import { PaymentBreakdown } from "@/components/charts/PaymentBreakdown"
import { UnitTypeRevenue } from "@/components/charts/UnitTypeRevenue"
import { PeriodSelector } from "./PeriodSelector"

// --- Helpers ---
const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)

// --- KPI Data ---
const KPI_DATA = {
  revenue: 504700000,
  revenueGrowth: 8.2,
  occupancy: 93.5,
  occupancyGrowth: 0.7,
  avgPayment: 4700000,
  avgPaymentGrowth: 1.3,
  growthMoM: 8.2,
}

// --- Top Tenants ---
const TOP_TENANTS = [
  { rank: 1, name: "Budi Santoso", unit: "B-0301", type: "3BR", totalPaid: 22500000 },
  { rank: 2, name: "Herman Wijaya", unit: "B-0601", type: "3BR", totalPaid: 22500000 },
  { rank: 3, name: "Novita Sari", unit: "B-0901", type: "3BR", totalPaid: 22500000 },
  { rank: 4, name: "Maya Lestari", unit: "B-0302", type: "2BR", totalPaid: 15600000 },
  { rank: 5, name: "Sari Dewi", unit: "B-0201", type: "2BR", totalPaid: 15600000 },
]

// --- Maintenance Units ---
const MAINTENANCE_UNITS = [
  { unit: "B-0402", type: "Studio", floor: 4, count: 4, lastDate: "15 Apr 2026" },
  { unit: "B-0501", type: "Studio", floor: 5, count: 3, lastDate: "02 Mei 2026" },
  { unit: "B-0701", type: "Studio", floor: 7, count: 2, lastDate: "10 Mar 2026" },
]

// --- KPI Card ---
function KpiCard({
  label,
  value,
  growth,
  icon: Icon,
  prefix,
  suffix,
}: {
  label: string
  value: number | string
  growth: number
  icon: React.ElementType
  prefix?: string
  suffix?: string
}) {
  const isPositive = growth >= 0
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="size-8 rounded-lg bg-[var(--emerald-light)] flex items-center justify-center">
          <Icon className="size-4 text-[var(--emerald)]" />
        </div>
      </div>
      <div>
        <p className="font-mono text-xl font-bold">
          {prefix}{typeof value === "number" ? value.toLocaleString("id-ID") : value}{suffix}
        </p>
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isPositive ? "text-[var(--emerald)]" : "text-red-500"}`}>
          {isPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          <span>{isPositive ? "+" : ""}{growth}% dari bulan lalu</span>
        </div>
      </div>
    </div>
  )
}

// --- Chart Card Shell ---
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5 space-y-4">
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <Suspense fallback={<div className="h-[240px] skeleton rounded-lg" />}>
        {children}
      </Suspense>
    </div>
  )
}

// --- Page (Server Component) ---
export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Laporan</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Analitik kinerja apartemen</p>
        </div>
        <div className="flex items-center gap-2">
          <PeriodSelector />
          <Button variant="outline" size="sm">
            <Download className="size-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Pendapatan"
          value={idr(KPI_DATA.revenue)}
          growth={KPI_DATA.revenueGrowth}
          icon={Wallet}
          prefix=""
        />
        <KpiCard
          label="Tingkat Hunian"
          value={KPI_DATA.occupancy}
          growth={KPI_DATA.occupancyGrowth}
          icon={Building2}
          suffix="%"
        />
        <KpiCard
          label="Rata-rata Pembayaran"
          value={idr(KPI_DATA.avgPayment)}
          growth={KPI_DATA.avgPaymentGrowth}
          icon={Users}
          prefix=""
        />
        <KpiCard
          label="Growth MoM"
          value={KPI_DATA.growthMoM}
          growth={KPI_DATA.growthMoM}
          icon={BarChart3}
          suffix="%"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Pendapatan Bulanan (6 Bulan Terakhir)">
          <RevenueBarChart />
        </ChartCard>
        <ChartCard title="Tren Tingkat Hunian">
          <OccupancyTrend />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Metode Pembayaran">
          <PaymentBreakdown />
        </ChartCard>
        <ChartCard title="Pendapatan per Tipe Unit">
          <UnitTypeRevenue />
        </ChartCard>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Tenants */}
        <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display text-sm font-semibold">Top 5 Penghuni — Total Pembayaran</h3>
          </div>
          <div className="divide-y divide-border">
            {TOP_TENANTS.map(t => (
              <div key={t.rank} className="flex items-center gap-3 px-5 py-3">
                <span className="font-mono text-xs font-bold text-muted-foreground w-4 text-right shrink-0">
                  {t.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{t.unit} · {t.type}</p>
                </div>
                <span className="font-mono text-sm font-semibold text-[var(--emerald)] shrink-0">
                  {idr(t.totalPaid)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Units */}
        <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display text-sm font-semibold">Unit dengan Maintenance Terbanyak</h3>
          </div>
          <div className="divide-y divide-border">
            {MAINTENANCE_UNITS.map(u => (
              <div key={u.unit} className="flex items-center gap-3 px-5 py-3">
                <span className="font-mono text-sm font-bold text-[var(--emerald)] shrink-0">{u.unit}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{u.type} · Lantai {u.floor}</p>
                  <p className="text-xs text-muted-foreground">Terakhir: {u.lastDate}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-sm font-bold">{u.count}</span>
                  <span className="text-xs text-muted-foreground">kali</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
