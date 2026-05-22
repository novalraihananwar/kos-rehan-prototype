"use client"

import { useState } from "react"
import {
  MessageSquare,
  CheckCircle2,
  Send,
  Pencil,
  Zap,
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
interface Template {
  id: string
  label: string
  message: string
  enabled: boolean
}

interface Schedule {
  id: string
  tipe: string
  kapan: string
  penerima: string
  enabled: boolean
}

// --- Mock Data ---
const TEMPLATES: Template[] = [
  {
    id: "sewa",
    label: "Pengingat Sewa",
    message:
      "Halo *{{nama}}*! 👋\n\nIni pengingat bahwa tagihan sewa unit *{{unit}}* Anda akan jatuh tempo dalam *3 hari* ({{tanggal_jatuh_tempo}}).\n\nJumlah yang harus dibayar: *{{jumlah}}*\n\nSilakan lakukan pembayaran sebelum tanggal jatuh tempo. Info lebih lanjut, hubungi resepsionis kami.\n\nTerima kasih,\n_Tim SmartApt_",
    enabled: true,
  },
  {
    id: "konfirmasi",
    label: "Konfirmasi Pembayaran",
    message:
      "Halo *{{nama}}*! ✅\n\nPembayaran sewa Anda telah kami terima.\n\n• Unit: *{{unit}}*\n• Periode: *{{periode}}*\n• Jumlah: *{{jumlah}}*\n• Tanggal bayar: *{{tanggal}}*\n\nBukti pembayaran dapat diakses melalui portal penghuni Anda.\n\nTerima kasih,\n_Tim SmartApt_",
    enabled: true,
  },
  {
    id: "maintenance",
    label: "Notifikasi Maintenance",
    message:
      "Halo *{{nama}}*! 🔧\n\nPembaruan work order Anda:\n\n• WO ID: *{{wo_id}}*\n• Unit: *{{unit}}*\n• Status: *{{status}}*\n\n{{pesan_tambahan}}\n\nJika ada pertanyaan, balas pesan ini.\n\n_Tim Maintenance SmartApt_",
    enabled: true,
  },
  {
    id: "welcome",
    label: "Selamat Datang",
    message:
      "Halo *{{nama}}*! 🎉\n\nSelamat datang di *SmartApt*! Kami senang memiliki Anda sebagai penghuni.\n\n• Unit Anda: *{{unit}}*\n• Check-in: *{{tanggal_masuk}}*\n• Kontak darurat: *021-5555-0100*\n\nKartu QR akses portal penghuni Anda sudah siap di resepsionis.\n\nSemoga betah! 😊\n_Tim SmartApt_",
    enabled: true,
  },
]

const SCHEDULES: Schedule[] = [
  {
    id: "1",
    tipe: "Pengingat H-3 Sewa",
    kapan: "Tanggal 28 tiap bulan",
    penerima: "Semua penghuni aktif",
    enabled: true,
  },
  {
    id: "2",
    tipe: "Pengingat H-0 (Jatuh Tempo)",
    kapan: "Jam 08:00 hari jatuh tempo",
    penerima: "Penghuni belum bayar",
    enabled: true,
  },
  {
    id: "3",
    tipe: "Konfirmasi Pembayaran",
    kapan: "Real-time (setelah verifikasi)",
    penerima: "Penghuni yang baru bayar",
    enabled: true,
  },
  {
    id: "4",
    tipe: "Laporan Bulanan ke Owner",
    kapan: "Tanggal 1 tiap bulan, 09:00",
    penerima: "Owner / Admin",
    enabled: true,
  },
]

// --- Helpers ---
function renderMessageWithHighlights(msg: string) {
  const parts = msg.split(/({{[^}]+}})/g)
  return parts.map((part, i) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      return (
        <span
          key={i}
          className="bg-[var(--emerald-light)] text-[var(--emerald)] rounded px-1 font-mono text-xs font-semibold"
        >
          {part}
        </span>
      )
    }
    // Render *bold* as bold
    const boldParts = part.split(/(\*[^*]+\*)/g)
    return boldParts.map((bp, j) => {
      if (bp.startsWith("*") && bp.endsWith("*")) {
        return <strong key={`${i}-${j}`}>{bp.slice(1, -1)}</strong>
      }
      return <span key={`${i}-${j}`}>{bp}</span>
    })
  })
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

// --- Template Panel ---
function TemplatePanel({ template }: { template: Template }) {
  const [enabled, setEnabled] = useState(template.enabled)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Aktifkan template ini</span>
          <Toggle checked={enabled} onChange={setEnabled} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Pencil className="size-3.5" />
            Edit Template
          </Button>
          <Button variant="outline" size="sm">
            <Send className="size-3.5" />
            Kirim Tes
          </Button>
        </div>
      </div>

      {/* Message preview */}
      <div className="bg-[#dcf8c6] rounded-2xl rounded-tl-none p-4 max-w-sm shadow-sm">
        <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800 font-body">
          {renderMessageWithHighlights(template.message)}
        </p>
        <p className="text-xs text-gray-500 mt-2 text-right">22:30 ✓✓</p>
      </div>

      <p className="text-xs text-muted-foreground">
        Variabel dalam{" "}
        <span className="font-mono bg-[var(--emerald-light)] text-[var(--emerald)] px-1 rounded">
          {"{{kurung kurawal}}"}
        </span>{" "}
        akan diganti otomatis dengan data penghuni.
      </p>
    </div>
  )
}

// --- Page ---
export default function WhatsAppPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(SCHEDULES)

  const toggleSchedule = (id: string, val: boolean) => {
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: val } : s)))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">WhatsApp Otomatis</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Atur notifikasi dan template pesan WhatsApp otomatis
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 p-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
              <MessageSquare className="size-5 text-[#25D366]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Status Koneksi</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[var(--emerald)]">
                  <span className="size-1.5 rounded-full bg-[var(--emerald)] inline-block" />
                  Terhubung
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">+62 811-2345-6789 · Provider: Fonnte API</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Konfigurasi API
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Pesan Terkirim Bulan Ini</p>
            <p className="font-mono text-xl font-bold tabular-nums mt-0.5">1,248</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tingkat Keberhasilan</p>
            <p className="font-mono text-xl font-bold tabular-nums mt-0.5 text-[var(--emerald)]">98.4%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Template Aktif</p>
            <p className="font-mono text-xl font-bold tabular-nums mt-0.5">4 / 4</p>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-base font-bold">Template Pesan</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Kustomisasi pesan yang dikirim otomatis ke penghuni
          </p>
        </div>
        <div className="p-5">
          <Tabs defaultValue="sewa">
            <TabsList>
              <TabsTrigger value="sewa">Pengingat Sewa</TabsTrigger>
              <TabsTrigger value="konfirmasi">Konfirmasi Pembayaran</TabsTrigger>
              <TabsTrigger value="maintenance">Notifikasi Maintenance</TabsTrigger>
              <TabsTrigger value="welcome">Selamat Datang</TabsTrigger>
            </TabsList>
            {TEMPLATES.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-4">
                <TemplatePanel template={t} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Jadwal Otomatis */}
      <div className="bg-card rounded-xl ring-1 ring-foreground/10 overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Zap className="size-4 text-[var(--emerald)]" />
          <h2 className="font-display text-base font-bold">Jadwal Otomatis</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="pl-5">Tipe Notifikasi</TableHead>
              <TableHead>Kapan Dikirim</TableHead>
              <TableHead>Penerima</TableHead>
              <TableHead className="pr-5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[var(--emerald)] shrink-0" />
                    <span className="text-sm font-medium">{schedule.tipe}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{schedule.kapan}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{schedule.penerima}</span>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-xs font-medium ${schedule.enabled ? "text-[var(--emerald)]" : "text-muted-foreground"}`}>
                      {schedule.enabled ? "Aktif" : "Nonaktif"}
                    </span>
                    <Toggle
                      checked={schedule.enabled}
                      onChange={(v) => toggleSchedule(schedule.id, v)}
                    />
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
