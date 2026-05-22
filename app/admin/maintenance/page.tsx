"use client"

import { useState } from "react"
import {
  Plus,
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

// --- Types ---
type Priority = "Urgent" | "Tinggi" | "Normal" | "Rendah"
type WOStatus = "Baru" | "Dalam Proses" | "Selesai"
type Kategori = "Listrik" | "Air" | "AC" | "Lift" | "Kebersihan" | "Lainnya"

interface WorkOrder {
  id: string
  unit: string
  kategori: Kategori
  deskripsi: string
  prioritas: Priority
  dilaporkan: string
  ditugaskan: string | null
  status: WOStatus
}

// --- Mock Data ---
const WORK_ORDERS: WorkOrder[] = [
  {
    id: "WO-2026-001",
    unit: "B-0402",
    kategori: "AC",
    deskripsi: "AC tidak mendingin, sudah 3 hari tidak berfungsi normal",
    prioritas: "Urgent",
    dilaporkan: "18 Mei 2026",
    ditugaskan: "Pak Hendra",
    status: "Dalam Proses",
  },
  {
    id: "WO-2026-002",
    unit: "B-0201",
    kategori: "Air",
    deskripsi: "Kebocoran pipa di bawah wastafel kamar mandi utama",
    prioritas: "Tinggi",
    dilaporkan: "19 Mei 2026",
    ditugaskan: "Pak Agus",
    status: "Baru",
  },
  {
    id: "WO-2026-003",
    unit: "B-0601",
    kategori: "Listrik",
    deskripsi: "Lampu kamar tidur utama padam, kemungkinan saklar rusak",
    prioritas: "Normal",
    dilaporkan: "19 Mei 2026",
    ditugaskan: null,
    status: "Baru",
  },
  {
    id: "WO-2026-004",
    unit: "Lift Tower B",
    kategori: "Lift",
    deskripsi: "Pintu lift lantai 7 tidak menutup sempurna, bunyi gesekan",
    prioritas: "Urgent",
    dilaporkan: "20 Mei 2026",
    ditugaskan: "Tim Teknik",
    status: "Dalam Proses",
  },
  {
    id: "WO-2026-005",
    unit: "B-0302",
    kategori: "Air",
    deskripsi: "Tekanan air shower sangat lemah, perlu cek instalasi",
    prioritas: "Normal",
    dilaporkan: "20 Mei 2026",
    ditugaskan: "Pak Agus",
    status: "Dalam Proses",
  },
  {
    id: "WO-2026-006",
    unit: "Lobby",
    kategori: "Kebersihan",
    deskripsi: "Noda cat di dinding dekat lift lantai 1, perlu pengecatan ulang",
    prioritas: "Rendah",
    dilaporkan: "15 Mei 2026",
    ditugaskan: "Tim Kebersihan",
    status: "Selesai",
  },
  {
    id: "WO-2026-007",
    unit: "B-1001",
    kategori: "AC",
    deskripsi: "Remote AC hilang, minta unit pengganti",
    prioritas: "Rendah",
    dilaporkan: "16 Mei 2026",
    ditugaskan: "Pak Hendra",
    status: "Selesai",
  },
  {
    id: "WO-2026-008",
    unit: "B-0102",
    kategori: "Listrik",
    deskripsi: "Stop kontak di ruang tamu longgar, perlu penggantian",
    prioritas: "Tinggi",
    dilaporkan: "21 Mei 2026",
    ditugaskan: null,
    status: "Baru",
  },
]

// --- Helpers ---
const priorityConfig: Record<Priority, { label: string; className: string }> = {
  Urgent: "bg-red-50 text-red-700",
  Tinggi: "bg-amber-50 text-amber-700",
  Normal: "bg-[oklch(0.97_0.04_162)] text-[oklch(0.48_0.145_162)]",
  Rendah: "bg-secondary text-muted-foreground",
} as unknown as Record<Priority, { label: string; className: string }>

const priorityClass: Record<Priority, string> = {
  Urgent: "bg-red-50 text-red-700",
  Tinggi: "bg-amber-50 text-amber-700",
  Normal: "bg-[oklch(0.97_0.04_162)] text-[oklch(0.48_0.145_162)]",
  Rendah: "bg-secondary text-muted-foreground",
}

const statusClass: Record<WOStatus, string> = {
  Baru: "badge-pending",
  "Dalam Proses": "bg-blue-50 text-blue-700",
  Selesai: "badge-paid",
}

// --- Create WO Dialog ---
function CreateWODialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            <Plus className="size-3.5" />
            Buat Work Order
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-base font-bold">Buat Work Order Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-1">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Unit</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih unit..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B-0101">B-0101 — Studio</SelectItem>
                <SelectItem value="B-0201">B-0201 — 2BR · Sari Dewi</SelectItem>
                <SelectItem value="B-0302">B-0302 — 2BR · Maya Lestari</SelectItem>
                <SelectItem value="B-0502">B-0502 — 2BR · Andi Pratama</SelectItem>
                <SelectItem value="lobby">Lobby / Area Umum</SelectItem>
                <SelectItem value="lift">Lift / Infrastruktur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Kategori</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Listrik">Listrik</SelectItem>
                <SelectItem value="Air">Air / Plumbing</SelectItem>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="Lift">Lift</SelectItem>
                <SelectItem value="Kebersihan">Kebersihan</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Prioritas</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih prioritas..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Tinggi">Tinggi</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Rendah">Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Deskripsi Masalah</label>
            <textarea
              rows={3}
              placeholder="Jelaskan masalah secara detail..."
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ditugaskan ke</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih teknisi (opsional)..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pak-hendra">Pak Hendra (AC & Listrik)</SelectItem>
                <SelectItem value="pak-agus">Pak Agus (Plumbing)</SelectItem>
                <SelectItem value="tim-teknik">Tim Teknik</SelectItem>
                <SelectItem value="tim-kebersihan">Tim Kebersihan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            Buat Work Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- WO Table ---
function WOTable({ orders }: { orders: WorkOrder[] }) {
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="pl-4 w-[120px]">WO-ID</TableHead>
            <TableHead className="w-[100px]">Unit</TableHead>
            <TableHead className="w-[110px]">Kategori</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead className="w-[100px]">Prioritas</TableHead>
            <TableHead className="w-[120px]">Dilaporkan</TableHead>
            <TableHead className="w-[130px]">Ditugaskan</TableHead>
            <TableHead className="w-[120px] pr-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((wo) => (
            <TableRow key={wo.id}>
              <TableCell className="pl-4">
                <span className="font-mono text-xs font-semibold text-muted-foreground">{wo.id}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm font-medium">{wo.unit}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-foreground">{wo.kategori}</span>
              </TableCell>
              <TableCell>
                <p className="text-sm text-foreground line-clamp-2 max-w-[280px]">{wo.deskripsi}</p>
              </TableCell>
              <TableCell>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityClass[wo.prioritas]}`}>
                  {wo.prioritas}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{wo.dilaporkan}</span>
              </TableCell>
              <TableCell>
                {wo.ditugaskan ? (
                  <span className="text-sm text-foreground">{wo.ditugaskan}</span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Belum ditugaskan</span>
                )}
              </TableCell>
              <TableCell className="pr-4">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusClass[wo.status]}`}>
                  {wo.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-16 text-center text-muted-foreground text-sm">
                Tidak ada work order.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// --- Page ---
export default function MaintenancePage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("semua")

  const filtered = WORK_ORDERS.filter((wo) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      wo.id.toLowerCase().includes(q) ||
      wo.unit.toLowerCase().includes(q) ||
      wo.deskripsi.toLowerCase().includes(q) ||
      wo.kategori.toLowerCase().includes(q)

    const matchTab =
      activeTab === "semua" ||
      (activeTab === "baru" && wo.status === "Baru") ||
      (activeTab === "proses" && wo.status === "Dalam Proses") ||
      (activeTab === "selesai" && wo.status === "Selesai")

    return matchSearch && matchTab
  })

  const stats = [
    {
      label: "Baru",
      value: WORK_ORDERS.filter((w) => w.status === "Baru").length,
      icon: Wrench,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Dalam Proses",
      value: WORK_ORDERS.filter((w) => w.status === "Dalam Proses").length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Selesai Bulan Ini",
      value: 34,
      icon: CheckCircle2,
      color: "text-[var(--emerald)]",
      bg: "bg-[var(--emerald-light)]",
    },
    {
      label: "Urgent",
      value: WORK_ORDERS.filter((w) => w.prioritas === "Urgent").length,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Kelola work order dan permintaan perbaikan
          </p>
        </div>
        <CreateWODialog />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Filter + Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Cari WO-ID, unit, deskripsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-3.5" />
          Filter
        </Button>
      </div>

      {/* Tabs + Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="semua">
            Semua
            <span className="ml-1.5 font-mono text-xs tabular-nums opacity-60">{WORK_ORDERS.length}</span>
          </TabsTrigger>
          <TabsTrigger value="baru">
            Baru
            <span className="ml-1.5 font-mono text-xs tabular-nums opacity-60">
              {WORK_ORDERS.filter((w) => w.status === "Baru").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="proses">
            Dalam Proses
            <span className="ml-1.5 font-mono text-xs tabular-nums opacity-60">
              {WORK_ORDERS.filter((w) => w.status === "Dalam Proses").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="selesai">
            Selesai
            <span className="ml-1.5 font-mono text-xs tabular-nums opacity-60">
              {WORK_ORDERS.filter((w) => w.status === "Selesai").length}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          <WOTable orders={filtered} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
