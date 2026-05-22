"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  Eye,
  Pencil,
  QrCode,
  MessageCircle,
  Phone,
  Mail,
  Home,
  CalendarDays,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

// --- Types ---
type PayStatus = "Lunas" | "Belum Bayar"

interface PayHistory {
  month: string
  status: PayStatus
  amount: number
}

interface Tenant {
  id: string
  name: string
  ktp: string
  phone: string
  email: string
  unit: string
  floor: number
  type: string
  contractType: "Tahunan" | "Bulanan"
  startDate: string
  endDate: string
  rent: number
  payStatus: PayStatus
  nearExpiry: boolean
  payHistory: PayHistory[]
}

// --- Mock Data ---
const TENANTS: Tenant[] = [
  {
    id: "1",
    name: "Andi Pratama",
    ktp: "3271011234560001",
    phone: "08111234567",
    email: "andi.pratama@email.com",
    unit: "B-0102",
    floor: 1,
    type: "1BR",
    contractType: "Tahunan",
    startDate: "2025-03-01",
    endDate: "2026-03-01",
    rent: 3800000,
    payStatus: "Lunas",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 3800000 },
      { month: "Apr 2026", status: "Lunas", amount: 3800000 },
      { month: "Mar 2026", status: "Lunas", amount: 3800000 },
    ],
  },
  {
    id: "2",
    name: "Sari Dewi",
    ktp: "3271019876540002",
    phone: "08221234567",
    email: "sari.dewi@email.com",
    unit: "B-0201",
    floor: 2,
    type: "2BR",
    contractType: "Tahunan",
    startDate: "2025-06-01",
    endDate: "2026-06-15",
    rent: 5200000,
    payStatus: "Lunas",
    nearExpiry: true,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 5200000 },
      { month: "Apr 2026", status: "Lunas", amount: 5200000 },
      { month: "Mar 2026", status: "Lunas", amount: 5200000 },
    ],
  },
  {
    id: "3",
    name: "Budi Santoso",
    ktp: "3271015432100003",
    phone: "08331234567",
    email: "budi.s@email.com",
    unit: "B-0301",
    floor: 3,
    type: "3BR",
    contractType: "Tahunan",
    startDate: "2024-11-01",
    endDate: "2025-11-01",
    rent: 7500000,
    payStatus: "Belum Bayar",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Belum Bayar", amount: 7500000 },
      { month: "Apr 2026", status: "Lunas", amount: 7500000 },
      { month: "Mar 2026", status: "Lunas", amount: 7500000 },
    ],
  },
  {
    id: "4",
    name: "Rini Kusuma",
    ktp: "3271012468100004",
    phone: "08441234567",
    email: "rini.k@email.com",
    unit: "B-0103",
    floor: 1,
    type: "1BR",
    contractType: "Bulanan",
    startDate: "2026-02-01",
    endDate: "2026-06-10",
    rent: 3800000,
    payStatus: "Lunas",
    nearExpiry: true,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 3800000 },
      { month: "Apr 2026", status: "Lunas", amount: 3800000 },
      { month: "Mar 2026", status: "Lunas", amount: 3800000 },
    ],
  },
  {
    id: "5",
    name: "Maya Lestari",
    ktp: "3271013579100005",
    phone: "08551234567",
    email: "maya.l@email.com",
    unit: "B-0302",
    floor: 3,
    type: "2BR",
    contractType: "Tahunan",
    startDate: "2025-09-01",
    endDate: "2026-09-01",
    rent: 5200000,
    payStatus: "Lunas",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 5200000 },
      { month: "Apr 2026", status: "Lunas", amount: 5200000 },
      { month: "Mar 2026", status: "Lunas", amount: 5200000 },
    ],
  },
  {
    id: "6",
    name: "Deni Wahyu",
    ktp: "3271016024100006",
    phone: "08661234567",
    email: "deni.w@email.com",
    unit: "B-0401",
    floor: 4,
    type: "1BR",
    contractType: "Tahunan",
    startDate: "2025-04-01",
    endDate: "2026-04-01",
    rent: 3800000,
    payStatus: "Belum Bayar",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Belum Bayar", amount: 3800000 },
      { month: "Apr 2026", status: "Belum Bayar", amount: 3800000 },
      { month: "Mar 2026", status: "Lunas", amount: 3800000 },
    ],
  },
  {
    id: "7",
    name: "Fitri Handayani",
    ktp: "3271017135100007",
    phone: "08771234567",
    email: "fitri.h@email.com",
    unit: "B-0502",
    floor: 5,
    type: "2BR",
    contractType: "Tahunan",
    startDate: "2025-07-01",
    endDate: "2026-07-01",
    rent: 5200000,
    payStatus: "Lunas",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 5200000 },
      { month: "Apr 2026", status: "Lunas", amount: 5200000 },
      { month: "Mar 2026", status: "Lunas", amount: 5200000 },
    ],
  },
  {
    id: "8",
    name: "Herman Wijaya",
    ktp: "3271018246100008",
    phone: "08881234567",
    email: "herman.w@email.com",
    unit: "B-0601",
    floor: 6,
    type: "3BR",
    contractType: "Tahunan",
    startDate: "2025-01-01",
    endDate: "2026-06-05",
    rent: 7500000,
    payStatus: "Lunas",
    nearExpiry: true,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 7500000 },
      { month: "Apr 2026", status: "Lunas", amount: 7500000 },
      { month: "Mar 2026", status: "Lunas", amount: 7500000 },
    ],
  },
  {
    id: "9",
    name: "Laila Nuraini",
    ktp: "3271019357100009",
    phone: "08991234567",
    email: "laila.n@email.com",
    unit: "B-0602",
    floor: 6,
    type: "1BR",
    contractType: "Bulanan",
    startDate: "2026-01-01",
    endDate: "2026-06-20",
    rent: 3800000,
    payStatus: "Lunas",
    nearExpiry: true,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 3800000 },
      { month: "Apr 2026", status: "Lunas", amount: 3800000 },
      { month: "Mar 2026", status: "Lunas", amount: 3800000 },
    ],
  },
  {
    id: "10",
    name: "Clara Oktavia",
    ktp: "3271010468100010",
    phone: "08101234567",
    email: "clara.o@email.com",
    unit: "B-1101",
    floor: 11,
    type: "Studio",
    contractType: "Bulanan",
    startDate: "2026-04-01",
    endDate: "2026-10-01",
    rent: 2500000,
    payStatus: "Lunas",
    nearExpiry: false,
    payHistory: [
      { month: "Mei 2026", status: "Lunas", amount: 2500000 },
      { month: "Apr 2026", status: "Lunas", amount: 2500000 },
      { month: "Mar 2026", status: "Lunas", amount: 0 },
    ],
  },
]

// --- Helpers ---
const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()
}

// --- Tenant Detail Drawer ---
function TenantDrawer({ tenant, onClose }: { tenant: Tenant; onClose: () => void }) {
  return (
    <Sheet open onOpenChange={open => { if (!open) onClose() }}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center gap-3 pr-8">
            <div className="size-12 rounded-full bg-[var(--emerald-light)] flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-[var(--emerald)]">
                {getInitials(tenant.name)}
              </span>
            </div>
            <div>
              <SheetTitle className="text-base font-bold font-display">{tenant.name}</SheetTitle>
              <SheetDescription className="font-mono text-xs">{tenant.unit} · {tenant.type}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-5 overflow-y-auto">
          {/* Contact Info */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kontak</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="size-3.5 text-muted-foreground shrink-0" />
                <span className="font-mono text-xs">{tenant.ktp}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-3.5 text-muted-foreground shrink-0" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-3.5 text-muted-foreground shrink-0" />
                <span>{tenant.email}</span>
              </div>
            </div>
          </div>

          {/* Unit & Contract */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unit & Kontrak</p>
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Home className="size-3.5 text-muted-foreground shrink-0" />
                <span>Unit {tenant.unit} · Lantai {tenant.floor} · {tenant.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="size-3.5 text-muted-foreground shrink-0" />
                <span>{formatDate(tenant.startDate)} — {formatDate(tenant.endDate)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tipe Kontrak</span>
                <span className="font-medium">{tenant.contractType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sewa/Bulan</span>
                <span className="font-mono font-semibold text-[var(--emerald)]">{idr(tenant.rent)}</span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Riwayat Pembayaran</p>
            <div className="space-y-1.5">
              {tenant.payHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40">
                  <span className="text-sm">{h.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{idr(h.amount)}</span>
                    <span className={h.status === "Lunas" ? "badge-paid" : "badge-overdue"}>
                      {h.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aksi Cepat</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="size-3.5" />
                Kirim WA
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <QrCode className="size-3.5" />
                QR Card
              </Button>
              <Button variant="outline" size="sm" className="col-span-2 w-full">
                <Pencil className="size-3.5" />
                Edit Data
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// --- Page ---
export default function TenantsPage() {
  const [search, setSearch] = useState("")
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  const filtered = useMemo(() => {
    if (!search) return TENANTS
    const q = search.toLowerCase()
    return TENANTS.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.unit.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q)
    )
  }, [search])

  // Stats
  const stats = {
    total: TENANTS.length,
    active: TENANTS.filter(t => t.payStatus === "Lunas").length,
    nearExpiry: TENANTS.filter(t => t.nearExpiry).length,
    newThisMonth: 2,
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Penghuni</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Kelola data penghuni aktif</p>
        </div>
        <Button size="sm" className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]">
          <Plus className="size-3.5" />
          Tambah Penghuni
        </Button>
      </div>

      {/* Stats Chips */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card ring-1 ring-foreground/10 text-sm">
          <span className="text-muted-foreground">Total Penghuni</span>
          <span className="font-mono font-bold">{stats.total}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card ring-1 ring-foreground/10 text-sm">
          <span className="text-muted-foreground">Kontrak Aktif</span>
          <span className="font-mono font-bold text-[var(--emerald)]">{stats.active}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card ring-1 ring-foreground/10 text-sm">
          <span className="text-muted-foreground">Habis 30 Hari</span>
          <span className="font-mono font-bold text-amber-600">{stats.nearExpiry}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card ring-1 ring-foreground/10 text-sm">
          <span className="text-muted-foreground">Baru Bulan Ini</span>
          <span className="font-mono font-bold">{stats.newThisMonth}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Cari nama, unit, email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="pl-4">Penghuni</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Tipe Kontrak</TableHead>
              <TableHead>Mulai — Selesai</TableHead>
              <TableHead>Sewa/Bulan</TableHead>
              <TableHead>Status Bayar</TableHead>
              <TableHead className="text-right pr-4">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(tenant => (
              <TableRow
                key={tenant.id}
                className={`cursor-pointer ${tenant.nearExpiry ? "bg-amber-50/60 hover:bg-amber-50" : ""}`}
                onClick={() => setSelectedTenant(tenant)}
              >
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-[var(--emerald-light)] flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs font-bold text-[var(--emerald)]">
                        {getInitials(tenant.name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tenant.name}</p>
                      <p className="text-xs text-muted-foreground">{tenant.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm font-semibold">{tenant.unit}</span>
                  <p className="text-xs text-muted-foreground">{tenant.type} · Lt. {tenant.floor}</p>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    tenant.contractType === "Tahunan"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-purple-50 text-purple-700"
                  }`}>
                    {tenant.contractType}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{formatDate(tenant.startDate)}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(tenant.endDate)}</p>
                  {tenant.nearExpiry && (
                    <span className="text-xs font-medium text-amber-600">Hampir habis</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm font-medium text-[var(--emerald)]">
                    {idr(tenant.rent)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={tenant.payStatus === "Lunas" ? "badge-paid" : "badge-overdue"}>
                    {tenant.payStatus}
                  </span>
                </TableCell>
                <TableCell className="pr-4" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setSelectedTenant(tenant)}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <QrCode className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <MessageCircle className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-16 text-center text-muted-foreground text-sm">
                  Tidak ada penghuni yang sesuai pencarian.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Drawer */}
      {selectedTenant && (
        <TenantDrawer
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  )
}
