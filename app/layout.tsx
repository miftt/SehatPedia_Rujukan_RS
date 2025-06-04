import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SehatPedia - Sistem Rujukan Digital",
  description: "Platform digital terintegrasi untuk sistem manajemen rujukan pasien dari Puskesmas ke Rumah Sakit",
  keywords: "rujukan, kesehatan, digital, puskesmas, rumah sakit, BPJS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster position="top-center"/>
        </body>
    </html>
  )
}
