'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Demo credential check — replace with real auth
    await new Promise((r) => setTimeout(r, 600))
    if (email === 'admin@smartapt.id' && password === 'demo1234') {
      router.push('/admin')
    } else {
      setError('Email atau password salah. Coba: admin@smartapt.id / demo1234')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center size-9 rounded-lg"
              style={{ backgroundColor: 'var(--emerald)' }}
            >
              <Building2 className="size-5 text-white" />
            </div>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SmartApt
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Masuk ke Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola properti Anda dari satu tempat.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@smartapt.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:underline"
                  style={{ color: 'var(--emerald)' }}
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2.5">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-semibold"
              style={{
                backgroundColor: 'var(--emerald)',
                color: 'white',
              }}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          {/* Demo note */}
          <div
            className="rounded-lg border px-4 py-3 space-y-1"
            style={{
              borderColor: 'var(--emerald)',
              backgroundColor: 'oklch(0.97 0.04 162 / 0.5)',
            }}
          >
            <p className="text-xs font-semibold" style={{ color: 'var(--emerald)' }}>
              Demo Credentials
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              admin@smartapt.id&nbsp;/&nbsp;demo1234
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Branding Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12"
        style={{ backgroundColor: 'var(--slate-hero)' }}
      >
        {/* Top: Logo white */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center size-9 rounded-lg"
            style={{ backgroundColor: 'var(--emerald)' }}
          >
            <Building2 className="size-5 text-white" />
          </div>
          <span
            className="text-xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SmartApt
          </span>
        </div>

        {/* Middle: Tagline */}
        <div className="space-y-6">
          <h2
            className="text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Manajemen Apartemen{' '}
            <span style={{ color: 'var(--emerald)' }}>Modern</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Platform terpadu untuk mengelola unit, penghuni, pembayaran,
            dan operasional — dari satu dashboard yang intuitif.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            {[
              {
                value: '247',
                label: 'Unit Aktif',
                sub: 'Terkelola penuh',
              },
              {
                value: '98.2%',
                label: 'Pembayaran Tepat Waktu',
                sub: 'Rata-rata 6 bulan',
              },
              {
                value: '12',
                label: 'WO Pending',
                sub: 'Ditangani tim teknis',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ backgroundColor: 'oklch(1 0 0 / 0.05)' }}
              >
                <div
                  className="mt-0.5 size-2 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--emerald)' }}
                />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--emerald)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright */}
        <p className="text-xs text-slate-600">
          &copy; 2026 SmartApt. Platform Manajemen Apartemen.
        </p>
      </div>
    </div>
  )
}
