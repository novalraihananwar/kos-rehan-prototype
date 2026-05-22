"use client"

import { useState } from "react"
import {
  Plus,
  UserCheck,
  Users,
  LogOut,
  Search,
  MapPin,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Types ---
type VisitorStatus = "Di Dalam" | "Sudah Keluar"

interface Visitor {
  id: string
  nama: string
  noKTP: string
  tujuanUnit: string
  ditemui: string
  checkIn: string
  estimasiKeluar: string
  checkOut: string | null
  durasi: string | null
  status: VisitorStatus
  keperluan: string
}

// --- Mock Data ---
const VISITORS: Visitor[] = [
  {
    id: "1",
    nama: "Budi Hartono",
    noKTP: "3171****5608",
    tujuanUnit: "B-0502",
    ditemui: "Andi Pratama",
    checkIn: "08:15",
    estimasiKeluar: "10:00",
    checkOut: null,
    durasi: null,
    status: "Di Dalam",
    keperluan: "Keluarga",
  },
  {
    id: "2",
    nama: "Dewi Rahayu",
    noKTP: "3174****2204",
    tujuanUnit: "B-0201",
    ditemui: "Sari Dewi",
    checkIn: "09:30",
    estimasiKeluar: "11:30",
    checkOut: null,
    durasi: null,
    status: "Di Dalam",
    keperluan: "Teman",
  },
  {
    id: "3",
    nama: "PT. Indah Jaya (Kurir)",
    noKTP: "3175****8812",
    tujuanUnit: "B-0601",
    ditemui: "Resepsionis",
    checkIn: "10:05",
    estimasiKeluar: "10:30",
    checkOut: "10:22",
    durasi: "17 menit",
    status: "Sudah Keluar",
    keperluan: "Pengiriman paket",
  },
  {
    id: "4",
    nama: "Rizky Aditya",
    noKTP: "3173****1107",
    tujuanUnit: "B-0302",
    ditemui: "Maya Lestari",
    checkIn: "11:00",
    estimasiKeluar: "13:00",
    checkOut: null,
    durasi: null,
    status: "Di Dalam",
    keperluan: "Teman",
  },
  {
    id: "5",
    nama: "Hendra Gunawan",
    noKTP: "3172****4409",
    tujuanUnit: "B-0301",
    ditemui: "Budi Santoso",
    checkIn: "13:45",
    estimasiKeluar: "15:00",
    checkOut: "14:52",
    durasi: "1 jam 7 menit",
    status: "Sudah Keluar",
    keperluan: "Rekan kerja",
  },
  {
    id: "6",
    nama: "Technician AC (PT. Dingin)",
    noKTP: "3176****3301",
    tujuanUnit: "B-0402",
    ditemui: "Admin Maintenance",
    checkIn: "14:00",
    estimasiKeluar: "16:00",
    checkOut: null,
    durasi: null,
    status: "Di Dalam",
    keperluan: "Maintenance AC",
  },
]

// --- Check-in Dialog ---
function CheckinDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            <Plus className="size-3.5" />
            Check-in Pengunjung
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-base font-bold">Check-in Pengunjung</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-1">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nama Pengunjung</label>
            <Input placeholder="Nama lengkap..." />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nomor KTP</label>
            <Input placeholder="16 digit nomor KTP..." />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tujuan Unit</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih unit tujuan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B-0102">B-0102 — Andi Pratama</SelectItem>
                <SelectItem value="B-0201">B-0201 — Sari Dewi</SelectItem>
                <SelectItem value="B-0301">B-0301 — Budi Santoso</SelectItem>
                <SelectItem value="B-0302">B-0302 — Maya Lestari</SelectItem>
                <SelectItem value="B-0401">B-0401 — Deni Wahyu</SelectItem>
                <SelectItem value="B-0502">B-0502 — Andi Pratama</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Keperluan</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih keperluan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="keluarga">Keluarga</SelectItem>
                <SelectItem value="teman">Teman</SelectItem>
                <SelectItem value="rekan-kerja">Rekan Kerja</SelectItem>
                <SelectItem value="pengiriman">Pengiriman Paket</SelectItem>
                <SelectItem value="maintenance">Maintenance / Teknisi</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Estimasi Durasi</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih durasi..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 menit</SelectItem>
                <SelectItem value="60">1 jam</SelectItem>
                <SelectItem value="120">2 jam</SelectItem>
                <SelectItem value="180">3 jam</SelectItem>
                <SelectItem value="240">Lebih dari 3 jam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            <UserCheck className="size-3.5" />
            Check-in Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Live Visitors Table ---
function LiveVisitorsTable({ visitors }: { visitors: Visitor[] }) {
  const inside = visitors.filter((v) => v.status === "Di Dalam")
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
        <span className="size-2 rounded-full bg-[var(--emerald)] animate-pulse" />
        <h2 className="font-display text-sm font-bold">Masih Di Dalam</h2>
        <span className="font-mono text-xs font-bold text-muted-foreground ml-auto">{inside.length} tamu</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="pl-5">Nama Pengunjung</TableHead>
            <TableHead>Tujuan Unit</TableHead>
            <TableHead>Ditemui</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Est. Keluar</TableHead>
            <TableHead className="pr-5">Keperluan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inside.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell className="pl-5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    {visitor.nama.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{visitor.nama}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-muted-foreground" />
                  <span className="font-mono text-sm font-medium">{visitor.tujuanUnit}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{visitor.ditemui}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm font-medium">{visitor.checkIn}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">{visitor.estimasiKeluar}</span>
              </TableCell>
              <TableCell className="pr-5">
                <span className="text-sm text-muted-foreground">{visitor.keperluan}</span>
              </TableCell>
            </TableRow>
          ))}
          {inside.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-muted-foreground text-sm">
                Tidak ada tamu di dalam gedung saat ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// --- Full Log Table ---
function FullLogTable({ visitors }: { visitors: Visitor[] }) {
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="pl-5">Nama</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Ditemui</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Durasi</TableHead>
            <TableHead className="pr-5">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell className="pl-5">
                <span className="text-sm font-medium">{visitor.nama}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{visitor.keperluan}</p>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">{visitor.tujuanUnit}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{visitor.ditemui}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{visitor.checkIn}</span>
              </TableCell>
              <TableCell>
                {visitor.checkOut ? (
                  <span className="font-mono text-sm">{visitor.checkOut}</span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">—</span>
                )}
              </TableCell>
              <TableCell>
                {visitor.durasi ? (
                  <span className="text-sm text-muted-foreground">{visitor.durasi}</span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">—</span>
                )}
              </TableCell>
              <TableCell className="pr-5">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    visitor.status === "Di Dalam"
                      ? "bg-blue-50 text-blue-700"
                      : "badge-paid"
                  }`}
                >
                  {visitor.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// --- Page ---
export default function VisitorsPage() {
  const [search, setSearch] = useState("")

  const filtered = VISITORS.filter((v) => {
    const q = search.toLowerCase()
    return (
      !q ||
      v.nama.toLowerCase().includes(q) ||
      v.tujuanUnit.toLowerCase().includes(q) ||
      v.ditemui.toLowerCase().includes(q) ||
      v.keperluan.toLowerCase().includes(q)
    )
  })

  const stats = [
    {
      label: "Masuk Hari Ini",
      value: 23,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Masih Di Dalam",
      value: VISITORS.filter((v) => v.status === "Di Dalam").length,
      icon: UserCheck,
      color: "text-[var(--emerald)]",
      bg: "bg-[var(--emerald-light)]",
    },
    {
      label: "Sudah Keluar",
      value: VISITORS.filter((v) => v.status === "Sudah Keluar").length,
      icon: LogOut,
      color: "text-muted-foreground",
      bg: "bg-secondary",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Pengunjung</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Pantau dan catat kunjungan tamu ke apartemen
          </p>
        </div>
        <CheckinDialog />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl ring-1 ring-foreground/10 p-5 flex items-center gap-4"
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                <Icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Live Visitors */}
      <LiveVisitorsTable visitors={VISITORS} />

      {/* Full Log */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold">Log Kunjungan</h2>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Cari nama, unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Tabs defaultValue="hari-ini">
          <TabsList>
            <TabsTrigger value="hari-ini">Hari Ini</TabsTrigger>
            <TabsTrigger value="minggu-ini">Minggu Ini</TabsTrigger>
            <TabsTrigger value="semua">Semua</TabsTrigger>
          </TabsList>
          <TabsContent value="hari-ini" className="mt-4">
            <FullLogTable visitors={filtered} />
          </TabsContent>
          <TabsContent value="minggu-ini" className="mt-4">
            <FullLogTable visitors={filtered} />
          </TabsContent>
          <TabsContent value="semua" className="mt-4">
            <FullLogTable visitors={filtered} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
