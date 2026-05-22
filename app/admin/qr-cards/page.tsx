"use client"

import { useState } from "react"
import {
  QrCode,
  Download,
  Printer,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
interface QRCard {
  id: string
  penghuni: string
  unit: string
  initials: string
  token: string
  dibuat: string
  terakhirDigunakan: string
  active: boolean
}

// --- Mock Data ---
const QR_CARDS: QRCard[] = [
  {
    id: "1",
    penghuni: "Andi Pratama",
    unit: "B-0502",
    initials: "AP",
    token: "SAT-A8X2-9KP1",
    dibuat: "1 Jan 2026",
    terakhirDigunakan: "22 Mei 2026",
    active: true,
  },
  {
    id: "2",
    penghuni: "Sari Dewi",
    unit: "B-0201",
    initials: "SD",
    token: "SAT-B3Y7-4MQ6",
    dibuat: "15 Feb 2026",
    terakhirDigunakan: "21 Mei 2026",
    active: true,
  },
  {
    id: "3",
    penghuni: "Budi Santoso",
    unit: "B-0301",
    initials: "BS",
    token: "SAT-C5Z1-2NR8",
    dibuat: "1 Mar 2026",
    terakhirDigunakan: "20 Mei 2026",
    active: true,
  },
  {
    id: "4",
    penghuni: "Maya Lestari",
    unit: "B-0302",
    initials: "ML",
    token: "SAT-D9W4-7LS3",
    dibuat: "10 Mar 2026",
    terakhirDigunakan: "18 Mei 2026",
    active: false,
  },
  {
    id: "5",
    penghuni: "Deni Wahyu",
    unit: "B-0401",
    initials: "DW",
    token: "SAT-E2V6-5HT0",
    dibuat: "1 Apr 2026",
    terakhirDigunakan: "22 Mei 2026",
    active: true,
  },
]

const TENANTS = [
  { value: "AP", label: "Andi Pratama — B-0502", unit: "B-0502 · Lantai 5 · 2 Bedroom", name: "Andi Pratama" },
  { value: "SD", label: "Sari Dewi — B-0201", unit: "B-0201 · Lantai 2 · 2 Bedroom", name: "Sari Dewi" },
  { value: "BS", label: "Budi Santoso — B-0301", unit: "B-0301 · Lantai 3 · 3 Bedroom", name: "Budi Santoso" },
  { value: "ML", label: "Maya Lestari — B-0302", unit: "B-0302 · Lantai 3 · 2 Bedroom", name: "Maya Lestari" },
  { value: "DW", label: "Deni Wahyu — B-0401", unit: "B-0401 · Lantai 4 · 1 Bedroom", name: "Deni Wahyu" },
]

// --- CSS QR Code Pattern ---
// A purely CSS/HTML approximation of a QR code using a grid of squares
function QRPattern() {
  // Pre-defined pattern for a visual QR impression (7x7 position markers + inner fill)
  // Each row is a bitmask of which columns are filled
  const grid: number[][] = [
    [1,1,1,1,1,1,1,0,1,0,0,1,0,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,0,1,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,0,1],
    [0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,1,0],
    [1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1],
    [0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0],
    [1,0,0,1,1,1,1,0,0,1,1,0,0,1,1,0,1,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,1,0,0],
    [1,0,1,1,1,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,1],
  ]

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(22, 1fr)`,
        gap: "1px",
        width: "100%",
        aspectRatio: "1",
      }}
    >
      {grid.map((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              backgroundColor: cell ? "#0f172a" : "transparent",
              borderRadius: cell ? "1px" : "0",
            }}
          />
        ))
      )}
    </div>
  )
}

// --- Card Preview ---
function CardPreview({ name, unit, initials }: { name: string; unit: string; initials: string }) {
  return (
    <div
      style={{
        width: "320px",
        minHeight: "192px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        overflow: "hidden",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Emerald top strip */}
      <div
        style={{
          height: "6px",
          background: "oklch(0.54 0.155 162)",
        }}
      />

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "-0.02em",
              color: "oklch(0.15 0.028 240)",
            }}
          >
            SmartApt
          </span>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              background: "oklch(0.54 0.155 162)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "white",
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* Content row */}
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          {/* QR Code */}
          <div style={{ width: "88px", height: "88px", flexShrink: 0, padding: "4px", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
            <QRPattern />
          </div>

          {/* Info */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", paddingTop: "2px" }}>
            {/* Avatar circle */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "oklch(0.54 0.155 162)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "white",
                marginBottom: "4px",
              }}
            >
              {initials}
            </div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "oklch(0.15 0.028 240)",
                lineHeight: 1.2,
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "oklch(0.48 0.022 240)",
                lineHeight: 1.4,
              }}
            >
              Unit {unit}
            </p>
            <p
              style={{
                fontSize: "9px",
                color: "oklch(0.54 0.155 162)",
                marginTop: "auto",
                paddingTop: "8px",
                fontWeight: 500,
              }}
            >
              portal.smartapt.id
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Page ---
export default function QRCardsPage() {
  const [selectedTenant, setSelectedTenant] = useState(TENANTS[0])
  const [cards, setCards] = useState<QRCard[]>(QR_CARDS)
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({})

  const toggleToken = (id: string) => {
    setShowTokens((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const maskToken = (token: string) => {
    const parts = token.split("-")
    return `${parts[0]}-****-****`
  }

  const handleTenantChange = (value: string | null) => {
    if (!value) return
    const t = TENANTS.find((t) => t.value === value)
    if (t) setSelectedTenant(t)
  }

  const toggleCardActive = (id: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kartu QR Penghuni</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate dan kelola kartu akses QR untuk setiap penghuni
          </p>
        </div>
        <Button className="bg-[var(--emerald)] text-white hover:bg-[var(--emerald-hover)]" size="sm">
          <Plus className="size-3.5" />
          Generate Batch
        </Button>
      </div>

      {/* Explainer Banner */}
      <div className="bg-[var(--emerald-light)] rounded-xl p-4 flex items-start gap-3">
        <QrCode className="size-5 text-[var(--emerald)] shrink-0 mt-0.5" />
        <p className="text-sm text-[oklch(0.35_0.12_162)]">
          Setiap penghuni mendapat kartu fisik dengan QR unik. Saat discan, penghuni langsung masuk portal mereka tanpa perlu login. Kartu dapat dicetak dan dilaminating sebagai kartu tanda penghuni.
        </p>
      </div>

      {/* Generator Section */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5">
        <h2 className="font-display text-base font-bold mb-4">Generator Kartu QR</h2>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Selector + Actions */}
          <div className="flex flex-col gap-4 flex-1 max-w-xs">
            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pilih Penghuni
              </label>
              <Select value={selectedTenant.value} onValueChange={handleTenantChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TENANTS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <RefreshCw className="size-3.5" />
                Generate Token Baru
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Download className="size-3.5" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Printer className="size-3.5" />
                Cetak Kartu
              </Button>
            </div>
          </div>

          {/* Card Preview */}
          <div className="flex flex-col items-start gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preview Kartu</p>
            <CardPreview
              name={selectedTenant.name}
              unit={selectedTenant.unit}
              initials={selectedTenant.value}
            />
            <p className="text-xs text-muted-foreground">Ukuran sebenarnya: 85.6mm × 54mm (standar kartu kredit)</p>
          </div>
        </div>
      </div>

      {/* Existing Cards Table */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-base font-bold">Kartu Aktif</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{cards.length} kartu terdaftar</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="pl-5">Penghuni</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Terakhir Digunakan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--emerald-light)] text-[var(--emerald)] text-xs font-bold">
                      {card.initials}
                    </div>
                    <span className="text-sm font-medium">{card.penghuni}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm text-muted-foreground">{card.unit}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-medium">
                      {showTokens[card.id] ? card.token : maskToken(card.token)}
                    </span>
                    <button
                      onClick={() => toggleToken(card.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showTokens[card.id] ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{card.dibuat}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{card.terakhirDigunakan}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      card.active ? "badge-paid" : "badge-vacant"
                    }`}
                  >
                    {card.active ? "Aktif" : "Nonaktif"}
                  </span>
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => toggleCardActive(card.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {card.active ? "Nonaktifkan" : "Aktifkan"}
                    </Button>
                    <Button variant="ghost" size="xs">
                      <RefreshCw className="size-3" />
                    </Button>
                    <Button variant="ghost" size="xs">
                      <Download className="size-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
