export const dynamic = "force-dynamic"

import { CheckCircle, AlertCircle, Phone, MessageCircle, ChevronDown, Building2, Calendar, CreditCard, Wrench, Wifi, Shield, QrCode } from "lucide-react"

interface Props {
  params: Promise<{ token: string }>
}

const MOCK_TENANT = {
  name: "Andi Pratama",
  initials: "AP",
  unit: "B-0502",
  floor: "5",
  type: "2 Bedroom",
  tower: "Tower B",
  leaseStart: "1 Jan 2026",
  leaseEnd: "31 Des 2026",
  phone: "0812-3456-7890",
  email: "andi.pratama@email.com",
  status: "active",
}

const MOCK_BILLING = {
  month: "Mei 2026",
  amount: 5_200_000,
  dueDate: "1 Juni 2026",
  status: "paid" as "paid" | "unpaid",
  paidDate: "28 Mei 2026",
  breakdown: [
    { label: "Sewa Unit", amount: 5_000_000 },
    { label: "Listrik", amount: 120_000 },
    { label: "Air", amount: 80_000 },
  ],
}

const MOCK_HISTORY = [
  { month: "Apr 2026", amount: 5_200_000, status: "paid", date: "29 Apr 2026" },
  { month: "Mar 2026", amount: 5_150_000, status: "paid", date: "28 Mar 2026" },
  { month: "Feb 2026", amount: 5_150_000, status: "paid", date: "27 Feb 2026" },
]

const MOCK_WO = [
  { id: "WO-2026-041", title: "AC di kamar utama kurang dingin", status: "in_progress", date: "18 Mei 2026" },
  { id: "WO-2026-028", title: "Pintu kamar mandi sulit dikunci", status: "done", date: "5 Mei 2026" },
]

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n)
}

export default async function TenantPortal({ params }: Props) {
  const { token } = await params
  const isPaid = MOCK_BILLING.status === "paid"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[var(--slate-hero)] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[var(--emerald)] flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-700 text-white text-base">SmartApt</span>
        </div>
        <span className="text-xs text-slate-400 font-mono">Portal Penghuni</span>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 pb-16">

        {/* Identity Card */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-[var(--slate-hero)] px-5 pt-6 pb-8 relative">
            {/* subtle grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} />
            <div className="relative flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--emerald)] flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="font-display font-bold text-white text-lg">{MOCK_TENANT.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white font-display font-bold text-xl leading-tight">{MOCK_TENANT.name}</h1>
                <p className="text-slate-300 text-sm mt-0.5">
                  Unit {MOCK_TENANT.unit} · {MOCK_TENANT.tower} Lantai {MOCK_TENANT.floor} · {MOCK_TENANT.type}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-2 bg-[var(--emerald)]/20 text-[oklch(0.78_0.1_162)] text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.1_162)]" />
                  Penghuni Aktif
                </span>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 bg-background/60 flex items-center gap-2 text-xs text-muted-foreground border-t">
            <Calendar className="w-3.5 h-3.5" />
            <span>Kontrak: {MOCK_TENANT.leaseStart} — {MOCK_TENANT.leaseEnd}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: CreditCard, label: "Tagihan", color: "text-[var(--emerald)]", bg: "bg-[var(--emerald-light)]" },
            { icon: Wrench, label: "Komplain", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: Phone, label: "Admin", color: "text-slate-600", bg: "bg-slate-100" },
          ].map(({ icon: Icon, label, color, bg }) => (
            <button key={label} className={`${bg} rounded-xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform`}>
              <Icon className={`w-5 h-5 ${color}`} />
              <span className={`text-xs font-semibold ${color}`}>{label}</span>
            </button>
          ))}
        </div>

        {/* Tagihan Bulan Ini */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tagihan</p>
                <p className="font-display font-bold text-lg text-foreground">{MOCK_BILLING.month}</p>
              </div>
              {isPaid ? (
                <span className="flex items-center gap-1.5 bg-[var(--emerald-light)] text-[oklch(0.48_0.145_162)] text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4" /> Lunas
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                  <AlertCircle className="w-4 h-4" /> Belum Bayar
                </span>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 mb-4">
              {MOCK_BILLING.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono font-medium text-foreground">{fmt(item.amount)}</span>
                </div>
              ))}
              <div className="border-t pt-2.5 flex justify-between items-center">
                <span className="font-semibold text-foreground text-sm">Total</span>
                <span className="font-mono font-bold text-foreground text-base">{fmt(MOCK_BILLING.amount)}</span>
              </div>
            </div>

            {isPaid ? (
              <div className="bg-[var(--emerald-light)] rounded-lg px-4 py-3 text-sm text-[oklch(0.44_0.13_162)]">
                Dibayar pada <strong>{MOCK_BILLING.paidDate}</strong>. Terima kasih!
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-50 border rounded-lg p-4 flex items-center justify-center">
                  {/* QRIS placeholder */}
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-white border-2 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Scan untuk bayar via QRIS</p>
                  </div>
                </div>
                <button className="w-full bg-[var(--emerald)] hover:bg-[var(--emerald-hover)] text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  Bayar via QRIS — {fmt(MOCK_BILLING.amount)}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Riwayat Pembayaran */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-display font-bold text-base text-foreground">Riwayat Pembayaran</h2>
          </div>
          <div className="divide-y">
            {MOCK_HISTORY.map((h) => (
              <div key={h.month} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{h.month}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-foreground">{fmt(h.amount)}</p>
                  <span className="badge-paid text-xs">Lunas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Orders */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-foreground">Permintaan Maintenance</h2>
            <button className="text-xs font-semibold text-[var(--emerald)] bg-[var(--emerald-light)] px-3 py-1.5 rounded-lg">
              + Ajukan
            </button>
          </div>
          <div className="divide-y">
            {MOCK_WO.map((wo) => (
              <div key={wo.id} className="px-5 py-3.5 flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${wo.status === "done" ? "bg-[var(--emerald)]" : "bg-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{wo.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{wo.id} · {wo.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  wo.status === "done"
                    ? "badge-paid"
                    : "badge-pending"
                }`}>
                  {wo.status === "done" ? "Selesai" : "Proses"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ajukan Komplain Form */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-display font-bold text-base text-foreground">Ajukan Komplain Baru</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Tim kami akan merespons dalam 1×24 jam</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Kategori</label>
              <div className="grid grid-cols-3 gap-2">
                {["Listrik", "Air/Plumbing", "AC", "Furnitur", "Kebersihan", "Lainnya"].map((cat) => (
                  <button key={cat} className="text-xs py-2 px-2 rounded-lg border border-border text-foreground hover:border-[var(--emerald)] hover:text-[var(--emerald)] hover:bg-[var(--emerald-light)] transition-colors font-medium">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Deskripsi</label>
              <textarea
                rows={3}
                placeholder="Jelaskan masalah yang Anda alami..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--emerald)]/40 focus:border-[var(--emerald)] resize-none"
              />
            </div>
            <button className="w-full bg-[var(--emerald)] hover:bg-[var(--emerald-hover)] text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              Kirim Laporan
            </button>
          </div>
        </div>

        {/* Info Apartemen */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-display font-bold text-base text-foreground">Informasi Apartemen</h2>
          </div>
          <div className="divide-y text-sm">
            {[
              { icon: Phone, label: "Resepsionis", value: "(021) 5555-1234", color: "text-slate-600" },
              { icon: Shield, label: "Security 24 Jam", value: "(021) 5555-9999", color: "text-slate-600" },
              { icon: Wifi, label: "WiFi Lobby", value: "SmartApt_Guest / smartapt2026", color: "text-[var(--emerald)]" },
              { icon: MessageCircle, label: "WhatsApp Admin", value: "+62 811-2345-678", color: "text-slate-600" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="px-5 py-3.5 flex items-center gap-3">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={`font-medium ${color} font-mono text-xs mt-0.5`}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center py-2">
          <p className="text-xs text-muted-foreground">
            Portal ini diakses via kartu QR Anda.
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kartu hilang? Hubungi resepsionis untuk regenerasi.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-3 font-mono">token: {token.slice(0, 8)}...</p>
        </div>
      </div>
    </div>
  )
}
