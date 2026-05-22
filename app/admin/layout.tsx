'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  ChartBarIncreasing,
  Wrench,
  Dumbbell,
  UserCheck,
  MessageCircle,
  QrCode,
  Bell,
  Search,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

// ── Nav structure ──────────────────────────────────────────────────────────

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
}

type NavSection = {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Properti',
    items: [
      { href: '/admin/unit', label: 'Unit', icon: Building2 },
      { href: '/admin/penghuni', label: 'Penghuni', icon: Users },
    ],
  },
  {
    title: 'Keuangan',
    items: [
      { href: '/admin/pembayaran', label: 'Pembayaran', icon: CreditCard },
      { href: '/admin/laporan', label: 'Laporan', icon: ChartBarIncreasing },
    ],
  },
  {
    title: 'Operasional',
    items: [
      { href: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
      { href: '/admin/amenitas', label: 'Amenitas', icon: Dumbbell },
      { href: '/admin/pengunjung', label: 'Pengunjung', icon: UserCheck },
    ],
  },
  {
    title: 'Komunikasi',
    items: [
      { href: '/admin/whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ],
  },
  {
    title: 'Alat',
    items: [
      { href: '/admin/qr', label: 'Kartu QR', icon: QrCode },
    ],
  },
]

// Friendly name map for breadcrumbs
const routeLabels: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/unit': 'Unit',
  '/admin/penghuni': 'Penghuni',
  '/admin/pembayaran': 'Pembayaran',
  '/admin/laporan': 'Laporan',
  '/admin/maintenance': 'Maintenance',
  '/admin/amenitas': 'Amenitas',
  '/admin/pengunjung': 'Pengunjung',
  '/admin/whatsapp': 'WhatsApp',
  '/admin/qr': 'Kartu QR',
}

// ── Sidebar ────────────────────────────────────────────────────────────────

function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col"
      style={{ backgroundColor: 'var(--slate-hero)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5 shrink-0"
        style={{ borderBottom: '1px solid oklch(1 0 0 / 0.08)' }}
      >
        <div
          className="flex items-center justify-center size-8 rounded-lg shrink-0"
          style={{ backgroundColor: 'var(--emerald)' }}
        >
          <Building2 className="size-4 text-white" />
        </div>
        <span
          className="text-lg font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          SmartApt
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.title}>
            <p
              className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'oklch(0.45 0.02 240)' }}
            >
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'border-l-2 pl-[9px]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      )}
                      style={
                        active
                          ? {
                              backgroundColor: 'oklch(0.54 0.155 162 / 0.15)',
                              color: 'var(--emerald)',
                              borderColor: 'var(--emerald)',
                            }
                          : undefined
                      }
                    >
                      <Icon className="size-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div
        className="shrink-0 px-3 py-3"
        style={{ borderTop: '1px solid oklch(1 0 0 / 0.08)' }}
      >
        <div className="flex items-center gap-3 rounded-lg px-2.5 py-2">
          <Avatar size="sm">
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback className="text-xs font-semibold bg-emerald-600/20 text-emerald-400">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Admin</p>
            <p className="text-xs text-slate-500 truncate">admin@smartapt.id</p>
          </div>
          <button
            title="Keluar"
            className="text-slate-500 hover:text-slate-300 transition-colors"
            onClick={() => (window.location.href = '/login')}
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

// ── Topbar ─────────────────────────────────────────────────────────────────

function Topbar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs: { label: string; href: string }[] = segments.reduce<
    { label: string; href: string }[]
  >((acc, seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = routeLabels[href] ?? seg.charAt(0).toUpperCase() + seg.slice(1)
    acc.push({ label, href })
    return acc
  }, [])

  return (
    <header
      className="flex items-center justify-between h-[60px] px-6 bg-card shrink-0"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="size-3.5 text-muted-foreground" />
            )}
            {i < breadcrumbs.length - 1 ? (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-foreground">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Search className="size-4" />
          <span className="hidden sm:inline">Cari...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative size-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell className="size-4" />
          <span
            className="absolute top-1.5 right-1.5 size-2 rounded-full"
            style={{ backgroundColor: 'var(--emerald)' }}
          />
        </button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar size="sm">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  backgroundColor: 'oklch(0.54 0.155 162 / 0.15)',
                  color: 'var(--emerald)',
                }}
              >
                AD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-muted-foreground">admin@smartapt.id</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil Saya</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => (window.location.href = '/login')}
            >
              <LogOut className="size-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// ── Layout ─────────────────────────────────────────────────────────────────

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
