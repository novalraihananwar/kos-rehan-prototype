"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  Download,
  Eye,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Banknote,
  Clock,
  AlertCircle,
  Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// --- Types ---
type PayStatus = "Lunas" | "Belum Bayar" | "Terlambat"
type PayMethod = "Transfer" | "QRIS" | "Cash"

interface Payment {
  id: string
  invoice: string
  tenant: string
  unit: string
  month: string
  amount: number
  method: PayMethod | null
  status: PayStatus
  paidDate: string | null
}

// --- Mock Data ---
const PAYMENTS: Payment[] = [
  {
    id: "1", invoice: "INV-2026-0001", tenant: "Andi Pratama", unit: "B-0102",
    month: "Mei 2026", amount: 3800000, method: "Transfer", status: "Lunas", paidDate: "2026-05-02",
  },
  {
    id: "2", invoice: "INV-2026-0002", tenant: "Sari Dewi", unit: "B-0201",
    month: "Mei 2026", amount: 5200000, method: "QRIS", status: "Lunas", paidDate: "2026-05-01",
  },
  {
    id: "3", invoice: "INV-2026-0003", tenant: "Budi Santoso", unit: "B-0301",
    month: "Mei 2026", amount: 7500000, method: null, status: "Belum Bayar", paidDate: null,
  },
  {
    id: "4", invoice: "INV-2026-0004", tenant: "Rini Kusuma", unit: "B-0103",
    month: "Mei 2026", amount: 3800000, method: "Transfer", status: "Lunas", paidDate: "2026-05-03",
  },
  {
    id: "5", invoice: "INV-2026-0005", tenant: "Maya Lestari", unit: "B-0302",
    month: "Mei 2026", amount: 5200000, method: "QRIS", status: "Lunas", paidDate: "2026-05-01",
  },
  {
    id: "6", invoice: "INV-2026-0006", tenant: "Deni Wahyu", unit: "B-0401",
    month: "Mei 2026", amount: 3800000, method: null, status: "Terlambat", paidDate: null,
  },
  {
    id: "7", invoice: "INV-2026-0007", tenant: "Fitri Handayani", unit: "B-0502",
    month: "Mei 2026", amount: 5200000, method: "Cash", status: "Lunas", paidDate: "2026-05-05",
  },
  {
    id: "8", invoice: "INV-2026-0008", tenant: "Herman Wijaya", unit: "B-0601",
    month: "Mei 2026", amount: 7500000, method: "Transfer", status: "Lunas", paidDate: "2026-05-01",
  },
  {
    id: "9", invoice: "INV-2026-0009", tenant: "Laila Nuraini", unit: "B-0602",
    month: "Mei 2026", amount: 3800000, method: "QRIS", status: "Lunas", paidDate: "2026-05-04",
  },
  {
    id: "10", invoice: "INV-2026-0010", tenant: "Agus Setiawan", unit: "B-0702",
    month: "Mei 2026", amount: 5200000, method: null, status: "Terlambat", paidDate: null,
  },
  {
    id: "11", invoice: "INV-2026-0011", tenant: "Clara Oktavia", unit: "B-1101",
    month: "Mei 2026", amount: 2500000, method: "Transfer", status: "Lunas", paidDate: "2026-05-02",
  },
  {
    id: "12", invoice: "INV-2026-0012", tenant: "Novita Sari", unit: "B-0901",
    month: "Mei 2026", amount: 7500000, method: null, status: "Belum Bayar", paidDate: null,
  },
]

// --- Helpers ---
const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

const methodConfig: Record<PayMethod, string> = {
  Transfer: "bg-blue-50 text-blue-700",
  QRIS: "bg-purple-50 text-purple-700",
  Cash: "bg-orange-50 text-orange-700",
}

// --- Summary Card ---
function SummaryCard({
  label,
  value,
  icon: Icon,
  colorClass,
}: {
  label: string
  value: string
  icon: React.ElementType
  colorClass: string
}) {
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5 flex items-start gap-4">
      <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="font-mono text-base font-bold mt-0.5 truncate">{value}</p>
      </div>
    </div>
  )
}

// --- Payment Table ---
function PaymentTable({ payments }: { payments: Payment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="pl-4">No. Invoice</TableHead>
          <TableHead>Penghuni</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Bulan</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Metode</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tanggal Bayar</TableHead>
          <TableHead className="text-right pr-4">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map(p => (
          <TableRow key={p.id}>
            <TableCell className="pl-4">
              <span className="font-mono text-xs font-medium">{p.invoice}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{p.tenant}</span>
            </TableCell>
            <TableCell>
              <span className="font-mono text-sm">{p.unit}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{p.month}</span>
            </TableCell>
            <TableCell>
              <span className="font-mono text-sm font-semibold">{idr(p.amount)}</span>
            </TableCell>
            <TableCell>
              {p.method ? (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${methodConfig[p.method]}`}>
                  {p.method}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell>
              <span className={
                p.status === "Lunas"
                  ? "badge-paid"
                  : p.status === "Terlambat"
                  ? "badge-overdue"
                  : "badge-pending"
              }>
                {p.status}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {p.paidDate ? formatDate(p.paidDate) : "—"}
              </span>
            </TableCell>
            <TableCell className="pr-4">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon-sm">
                  <Eye className="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Download className="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <MessageCircle className="size-3.5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {payments.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className="py-16 text-center text-muted-foreground text-sm">
              Tidak ada data pembayaran.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

// --- MONTHS ---
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

// --- Page ---
export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("semua")
  const [monthIndex, setMonthIndex] = useState(4) // Mei = index 4
  const currentYear = 2026

  const tabFiltered = useMemo(() => {
    if (activeTab === "lunas") return PAYMENTS.filter(p => p.status === "Lunas")
    if (activeTab === "belum") return PAYMENTS.filter(p => p.status === "Belum Bayar")
    if (activeTab === "terlambat") return PAYMENTS.filter(p => p.status === "Terlambat")
    return PAYMENTS
  }, [activeTab])

  // Summary totals
  const sudahBayar = PAYMENTS.filter(p => p.status === "Lunas").reduce((s, p) => s + p.amount, 0)
  const belumBayar = PAYMENTS.filter(p => p.status === "Belum Bayar").reduce((s, p) => s + p.amount, 0)
  const terlambat = PAYMENTS.filter(p => p.status === "Terlambat").reduce((s, p) => s + p.amount, 0)
  const total = PAYMENTS.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Pembayaran</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Tagihan dan riwayat pembayaran</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Month Picker */}
          <div className="flex items-center gap-1 bg-card ring-1 ring-foreground/10 rounded-lg px-1 h-8">
            <button
              onClick={() => setMonthIndex(i => Math.max(0, i - 1))}
              className="p-1 rounded hover:bg-muted transition-colors disabled:opacity-40"
              disabled={monthIndex === 0}
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="text-sm font-medium px-2 min-w-[120px] text-center">
              {MONTHS[monthIndex]} {currentYear}
            </span>
            <button
              onClick={() => setMonthIndex(i => Math.min(11, i + 1))}
              className="p-1 rounded hover:bg-muted transition-colors disabled:opacity-40"
              disabled={monthIndex === 11}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <Button size="sm" className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]">
            <Plus className="size-3.5" />
            Buat Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Sudah Dibayar"
          value={idr(sudahBayar)}
          icon={Banknote}
          colorClass="bg-[var(--emerald-light)] text-[var(--emerald)]"
        />
        <SummaryCard
          label="Belum Dibayar"
          value={idr(belumBayar)}
          icon={Clock}
          colorClass="bg-amber-50 text-amber-600"
        />
        <SummaryCard
          label="Terlambat"
          value={idr(terlambat)}
          icon={AlertCircle}
          colorClass="bg-red-50 text-red-600"
        />
        <SummaryCard
          label="Total Tagihan"
          value={idr(total)}
          icon={Receipt}
          colorClass="bg-blue-50 text-blue-600"
        />
      </div>

      {/* Tabs + Table */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <div className="px-4 pt-4 border-b border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="line" className="gap-0">
              <TabsTrigger value="semua">
                Semua
                <span className="ml-1.5 font-mono text-xs bg-muted px-1.5 py-0.5 rounded-full">{PAYMENTS.length}</span>
              </TabsTrigger>
              <TabsTrigger value="lunas">
                Lunas
                <span className="ml-1.5 font-mono text-xs bg-muted px-1.5 py-0.5 rounded-full">
                  {PAYMENTS.filter(p => p.status === "Lunas").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="belum">
                Belum Bayar
                <span className="ml-1.5 font-mono text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                  {PAYMENTS.filter(p => p.status === "Belum Bayar").length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="terlambat">
                Terlambat
                <span className="ml-1.5 font-mono text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                  {PAYMENTS.filter(p => p.status === "Terlambat").length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="semua" className="mt-0">
              <PaymentTable payments={tabFiltered} />
            </TabsContent>
            <TabsContent value="lunas" className="mt-0">
              <PaymentTable payments={tabFiltered} />
            </TabsContent>
            <TabsContent value="belum" className="mt-0">
              <PaymentTable payments={tabFiltered} />
            </TabsContent>
            <TabsContent value="terlambat" className="mt-0">
              <PaymentTable payments={tabFiltered} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
