"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, this would validate credentials
    if (email && password) {
      // Get username part from email (before @gmail.com)
      const username = email.split('@')[0]
      
      // Redirect based on email prefix
      if (username.startsWith('dokter.puskesmas')) {
        router.push("/dashboard/puskesmas")
      } else if (username.startsWith('admin.puskesmas')) {
        router.push("/dashboard/puskesmas")
      } else if (username.startsWith('dokter.rs')) {
        router.push("/dashboard/rumah-sakit")
      } else if (username.startsWith('admin.rs')) {
        router.push("/dashboard/rumah-sakit")
      } else if (username.startsWith('pasien')) {
        router.push("/dashboard/pasien")
      } else if (username.startsWith('admin.dinkes')) {
        router.push("/dashboard/dinkes")
      } else {
        router.push("/dashboard")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SehatPedia</h1>
              <p className="text-sm text-gray-600">Sistem Rujukan Digital</p>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
            <CardDescription>Masukkan email dan password Anda untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Gmail Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                  title="Harap masukkan alamat Gmail yang valid"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Lupa password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Daftar sekarang
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Email Gmail:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>dokter.puskesmas.demo@gmail.com (Dokter Puskesmas)</li>
                  <li>admin.puskesmas.demo@gmail.com (Admin Puskesmas)</li>
                  <li>dokter.rs.demo@gmail.com (Dokter Rumah Sakit)</li>
                  <li>admin.rs.demo@gmail.com (Admin Rumah Sakit)</li>
                  <li>pasien.demo@gmail.com (Pasien)</li>
                  <li>admin.dinkes.demo@gmail.com (Admin Dinas Kesehatan)</li>
                </ul>
                <p className="mt-2">
                  <strong>Password:</strong> demo123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
