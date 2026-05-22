"use client"

import { useState } from "react"
import {
  Plus,
  Dumbbell,
  Waves,
  Presentation,
  TreePine,
  WashingMachine,
  Car,
  Users,
  Clock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Types ---
interface Amenity {
  id: string
  name: string
  icon: React.ElementType
  capacity: number
  hours: string
  bookingsToday: number
  active: boolean
}

interface Booking {
  id: string
  waktu: string
  penghuni: string
  unit: string
  amenitas: string
  status: "Konfirmasi" | "Pending" | "Batal"
}

// --- Mock Data ---
const AMENITIES: Amenity[] = [
  { id: "gym", name: "Gym", icon: Dumbbell, capacity: 20, hours: "05:00 – 22:00", bookingsToday: 8, active: true },
  { id: "pool", name: "Kolam Renang", icon: Waves, capacity: 30, hours: "06:00 – 21:00", bookingsToday: 12, active: true },
  { id: "meeting", name: "Ruang Meeting", icon: Presentation, capacity: 12, hours: "08:00 – 20:00", bookingsToday: 3, active: true },
  { id: "rooftop", name: "Rooftop Garden", icon: TreePine, capacity: 40, hours: "07:00 – 22:00", bookingsToday: 5, active: true },
  { id: "laundry", name: "Laundry", icon: WashingMachine, capacity: 6, hours: "07:00 – 21:00", bookingsToday: 9, active: true },
  { id: "parking", name: "Parkir", icon: Car, capacity: 150, hours: "24 Jam", bookingsToday: 0, active: false },
]

const BOOKINGS: Booking[] = [
  { id: "1", waktu: "07:00 – 08:00", penghuni: "Andi Pratama", unit: "B-0502", amenitas: "Gym", status: "Konfirmasi" },
  { id: "2", waktu: "09:00 – 10:00", penghuni: "Sari Dewi", unit: "B-0201", amenitas: "Kolam Renang", status: "Konfirmasi" },
  { id: "3", waktu: "10:00 – 11:00", penghuni: "Budi Santoso", unit: "B-0301", amenitas: "Ruang Meeting", status: "Pending" },
  { id: "4", waktu: "14:00 – 15:00", penghuni: "Maya Lestari", unit: "B-0302", amenitas: "Rooftop Garden", status: "Konfirmasi" },
  { id: "5", waktu: "16:00 – 17:00", penghuni: "Rini Kusuma", unit: "B-0103", amenitas: "Gym", status: "Batal" },
]

const statusClass: Record<Booking["status"], string> = {
  Konfirmasi: "badge-paid",
  Pending: "badge-pending",
  Batal: "badge-overdue",
}

// --- Toggle Switch ---
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        checked ? "bg-[var(--emerald)]" : "bg-input"
      }`}
    >
      <span
        className={`pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  )
}

// --- Amenity Card ---
function AmenityCard({
  amenity,
  onToggle,
}: {
  amenity: Amenity
  onToggle: (id: string, val: boolean) => void
}) {
  const Icon = amenity.icon
  return (
    <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--emerald-light)]">
            <Icon className="size-5 text-[var(--emerald)]" />
          </div>
          <div>
            <p className="font-semibold text-sm">{amenity.name}</p>
            <p className={`text-xs font-medium mt-0.5 ${amenity.active ? "text-[var(--emerald)]" : "text-muted-foreground"}`}>
              {amenity.active ? "Aktif" : "Tutup"}
            </p>
          </div>
        </div>
        <Toggle checked={amenity.active} onChange={(v) => onToggle(amenity.id, v)} />
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="size-3.5 shrink-0" />
          <span>Kapasitas {amenity.capacity}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span className="text-xs">{amenity.hours}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-xs text-muted-foreground">Booking hari ini</span>
        <span className="font-mono text-sm font-semibold tabular-nums">{amenity.bookingsToday}</span>
      </div>
    </div>
  )
}

// --- Add Amenity Dialog ---
function AddAmenityDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            <Plus className="size-3.5" />
            Tambah Amenitas
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-base font-bold">Tambah Amenitas Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-1">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nama Amenitas</label>
            <Input placeholder="cth. Sauna, BBQ Area..." />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Kapasitas (orang)</label>
            <Input type="number" placeholder="20" />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Jam Operasional</label>
            <Input placeholder="cth. 06:00 – 22:00" />
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Lantai / Lokasi</label>
            <Input placeholder="cth. Lantai 2, Rooftop" />
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
            Simpan Amenitas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Page ---
const DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>(AMENITIES)
  // Anchor on 22 May 2026 to match the rest of the mock data.
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(2026, 4, 22))

  const handleToggle = (id: string, val: boolean) => {
    setAmenities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: val } : a))
    )
  }

  const shiftDay = (delta: number) => {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + delta)
      return next
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Amenitas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Kelola fasilitas apartemen dan jadwal booking
          </p>
        </div>
        <AddAmenityDialog />
      </div>

      {/* Amenity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <AmenityCard key={amenity.id} amenity={amenity} onToggle={handleToggle} />
        ))}
      </div>

      {/* Booking Schedule */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-[var(--emerald)]" />
            <h2 className="font-display text-base font-bold">Jadwal Booking</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => shiftDay(-1)}
              aria-label="Hari sebelumnya"
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <span className="text-sm font-medium px-2">
              {DATE_FORMATTER.format(selectedDate)}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => shiftDay(1)}
              aria-label="Hari berikutnya"
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="pl-5">Waktu</TableHead>
              <TableHead>Penghuni</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Amenitas</TableHead>
              <TableHead className="pr-5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BOOKINGS.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="pl-5">
                  <span className="font-mono text-sm font-medium">{booking.waktu}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{booking.penghuni}</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm text-muted-foreground">{booking.unit}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{booking.amenitas}</span>
                </TableCell>
                <TableCell className="pr-5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusClass[booking.status]}`}>
                    {booking.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
