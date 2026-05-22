"use client"

import { useState, useMemo } from "react"
import {
  LayoutGrid,
  List,
  Search,
  Download,
  Plus,
  Eye,
  Pencil,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
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

// --- Types ---
type UnitStatus = "Terisi" | "Kosong" | "Maintenance"
type UnitType = "Studio" | "1BR" | "2BR" | "3BR"

interface Unit {
  id: string
  number: string
  floor: number
  type: UnitType
  tenant: string | null
  rent: number
  status: UnitStatus
}

// --- Mock Data ---
const UNITS: Unit[] = [
  { id: "1", number: "B-0101", floor: 1, type: "Studio", tenant: null, rent: 2500000, status: "Kosong" },
  { id: "2", number: "B-0102", floor: 1, type: "1BR", tenant: "Andi Pratama", rent: 3800000, status: "Terisi" },
  { id: "3", number: "B-0103", floor: 1, type: "1BR", tenant: "Rini Kusuma", rent: 3800000, status: "Terisi" },
  { id: "4", number: "B-0201", floor: 2, type: "2BR", tenant: "Sari Dewi", rent: 5200000, status: "Terisi" },
  { id: "5", number: "B-0202", floor: 2, type: "Studio", tenant: null, rent: 2500000, status: "Kosong" },
  { id: "6", number: "B-0301", floor: 3, type: "3BR", tenant: "Budi Santoso", rent: 7500000, status: "Terisi" },
  { id: "7", number: "B-0302", floor: 3, type: "2BR", tenant: "Maya Lestari", rent: 5200000, status: "Terisi" },
  { id: "8", number: "B-0401", floor: 4, type: "1BR", tenant: "Deni Wahyu", rent: 3800000, status: "Terisi" },
  { id: "9", number: "B-0402", floor: 4, type: "Studio", tenant: null, rent: 2500000, status: "Maintenance" },
  { id: "10", number: "B-0501", floor: 5, type: "Studio", tenant: null, rent: 2500000, status: "Maintenance" },
  { id: "11", number: "B-0502", floor: 5, type: "2BR", tenant: "Fitri Handayani", rent: 5200000, status: "Terisi" },
  { id: "12", number: "B-0601", floor: 6, type: "3BR", tenant: "Herman Wijaya", rent: 7500000, status: "Terisi" },
  { id: "13", number: "B-0602", floor: 6, type: "1BR", tenant: "Laila Nuraini", rent: 3800000, status: "Terisi" },
  { id: "14", number: "B-0701", floor: 7, type: "Studio", tenant: null, rent: 2500000, status: "Kosong" },
  { id: "15", number: "B-0702", floor: 7, type: "2BR", tenant: "Agus Setiawan", rent: 5200000, status: "Terisi" },
  { id: "16", number: "B-0801", floor: 8, type: "1BR", tenant: null, rent: 3800000, status: "Kosong" },
  { id: "17", number: "B-0901", floor: 9, type: "3BR", tenant: "Novita Sari", rent: 7500000, status: "Terisi" },
  { id: "18", number: "B-1001", floor: 10, type: "2BR", tenant: "Ridwan Halim", rent: 5200000, status: "Terisi" },
  { id: "19", number: "B-1101", floor: 11, type: "Studio", tenant: "Clara Oktavia", rent: 2500000, status: "Terisi" },
  { id: "20", number: "B-1205", floor: 12, type: "1BR", tenant: null, rent: 3800000, status: "Kosong" },
]

// --- Helpers ---
const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)

const statusConfig: Record<UnitStatus, { label: string; className: string }> = {
  Terisi: { label: "Terisi", className: "badge-paid" },
  Kosong: { label: "Kosong", className: "badge-vacant" },
  Maintenance: { label: "Maintenance", className: "badge-pending" },
}

const typeConfig: Record<UnitType, string> = {
  Studio: "bg-blue-50 text-blue-700",
  "1BR": "bg-purple-50 text-purple-700",
  "2BR": "bg-orange-50 text-orange-700",
  "3BR": "bg-rose-50 text-rose-700",
}

type SortField = "number" | "floor" | "type" | "rent" | "status"
type SortDir = "asc" | "desc"

// --- Sort Icon ---
function SortIcon({ field, sort }: { field: SortField; sort: { field: SortField; dir: SortDir } }) {
  if (sort.field !== field) return <ChevronsUpDown className="ml-1 inline size-3 text-muted-foreground" />
  return sort.dir === "asc"
    ? <ChevronUp className="ml-1 inline size-3 text-[var(--emerald)]" />
    : <ChevronDown className="ml-1 inline size-3 text-[var(--emerald)]" />
}

// --- Unit Card ---
function UnitCard({ unit }: { unit: Unit }) {
  const sc = statusConfig[unit.status]
  const tc = typeConfig[unit.type]
  return (
    <div className="group relative bg-card rounded-xl ring-1 ring-foreground/10 p-5 flex flex-col gap-3 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-200">
      {/* Quick action overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-base font-semibold tracking-tight">{unit.number}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Lantai {unit.floor}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tc}`}>{unit.type}</span>
          <span className={sc.className}>{sc.label}</span>
        </div>
      </div>
      <div className="flex-1">
        {unit.tenant ? (
          <p className="text-sm font-medium text-foreground">{unit.tenant}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada penghuni</p>
        )}
        <p className="font-mono text-sm font-semibold text-[var(--emerald)] mt-1">{idr(unit.rent)}/bln</p>
      </div>
      {/* Hover actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="xs" className="flex-1">
          <Eye className="size-3" />
          Lihat
        </Button>
        <Button variant="outline" size="xs" className="flex-1">
          <Pencil className="size-3" />
          Edit
        </Button>
      </div>
    </div>
  )
}

// --- Page ---
export default function UnitsPage() {
  const [search, setSearch] = useState("")
  const [floor, setFloor] = useState("all")
  const [type, setType] = useState("all")
  const [status, setStatus] = useState("all")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({ field: "number", dir: "asc" })

  const filtered = useMemo(() => {
    let data = [...UNITS]
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(u =>
        u.number.toLowerCase().includes(q) ||
        u.type.toLowerCase().includes(q) ||
        (u.tenant?.toLowerCase().includes(q) ?? false)
      )
    }
    if (floor !== "all") data = data.filter(u => u.floor === Number(floor))
    if (type !== "all") data = data.filter(u => u.type === type)
    if (status !== "all") data = data.filter(u => u.status === status)
    // sort
    data.sort((a, b) => {
      let cmp = 0
      if (sort.field === "number") cmp = a.number.localeCompare(b.number)
      else if (sort.field === "floor") cmp = a.floor - b.floor
      else if (sort.field === "type") cmp = a.type.localeCompare(b.type)
      else if (sort.field === "rent") cmp = a.rent - b.rent
      else if (sort.field === "status") cmp = a.status.localeCompare(b.status)
      return sort.dir === "asc" ? cmp : -cmp
    })
    return data
  }, [search, floor, type, status, sort])

  const toggleSort = (field: SortField) => {
    setSort(prev => prev.field === field ? { field, dir: prev.dir === "asc" ? "desc" : "asc" } : { field, dir: "asc" })
  }

  const floors = Array.from({ length: 20 }, (_, i) => String(i + 1))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Manajemen Unit</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} dari {UNITS.length} unit ditampilkan</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-3.5" />
            Export
          </Button>
          <Button size="sm" className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]">
            <Plus className="size-3.5" />
            Tambah Unit
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Cari nomor unit, tipe, penghuni..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={floor} onValueChange={(v) => setFloor(v ?? "all")}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Lantai" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Lantai</SelectItem>
            {floors.map(f => (
              <SelectItem key={f} value={f}>Lantai {f}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="1BR">1BR</SelectItem>
            <SelectItem value="2BR">2BR</SelectItem>
            <SelectItem value="3BR">3BR</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Terisi">Terisi</SelectItem>
            <SelectItem value="Kosong">Kosong</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="ml-auto flex items-center rounded-lg border border-input overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 h-8 text-sm transition-colors ${
              view === "grid"
                ? "bg-[var(--emerald)] text-white"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 h-8 text-sm transition-colors ${
              view === "list"
                ? "bg-[var(--emerald)] text-white"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <List className="size-3.5" />
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(unit => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted-foreground text-sm">
              Tidak ada unit yang sesuai filter.
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead
                  className="cursor-pointer select-none pl-4"
                  onClick={() => toggleSort("number")}
                >
                  Unit <SortIcon field="number" sort={sort} />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort("floor")}
                >
                  Lantai <SortIcon field="floor" sort={sort} />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort("type")}
                >
                  Tipe <SortIcon field="type" sort={sort} />
                </TableHead>
                <TableHead>Penghuni</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort("rent")}
                >
                  Sewa/Bulan <SortIcon field="rent" sort={sort} />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort("status")}
                >
                  Status <SortIcon field="status" sort={sort} />
                </TableHead>
                <TableHead className="text-right pr-4">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(unit => {
                const sc = statusConfig[unit.status]
                const tc = typeConfig[unit.type]
                return (
                  <TableRow key={unit.id}>
                    <TableCell className="pl-4">
                      <span className="font-mono font-semibold text-sm">{unit.number}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">Lt. {unit.floor}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tc}`}>
                        {unit.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      {unit.tenant ? (
                        <span className="text-sm">{unit.tenant}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm font-medium text-[var(--emerald)]">
                        {idr(unit.rent)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={sc.className}>{sc.label}</span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center text-muted-foreground text-sm">
                    Tidak ada unit yang sesuai filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
