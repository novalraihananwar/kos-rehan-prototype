import type { Metadata } from "next"
import { Bricolage_Grotesque, Manrope, Geist_Mono } from "next/font/google"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "SmartApt — Apartment Management Platform",
    template: "%s | SmartApt",
  },
  description:
    "Platform manajemen apartemen modern untuk kompleks skala besar. Kelola unit, penghuni, pembayaran, dan maintenance dari satu dashboard.",
  keywords: ["apartment management", "property management", "manajemen apartemen", "SmartApt"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${manrope.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
