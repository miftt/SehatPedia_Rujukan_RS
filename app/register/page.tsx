"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nik: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password tidak cocok!")
      return
    }

    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("Mohon gunakan email Gmail!")
      return
    }

    if (formData.nik.length !== 16) {
      toast.error("NIK harus 16 digit!")
      return
    }

    try {
      // Here you would typically send the data to your backend
      console.log("Registration data:", {
        ...formData,
        role: "patient" // Always set role as patient
      })

      // Show success message
      toast.success("Pendaftaran berhasil! Silakan login.")

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Gagal mendaftar. Silakan coba lagi.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
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
            <CardTitle className="text-2xl">Daftar Akun Pasien</CardTitle>
            <CardDescription>
              Lengkapi data diri Anda untuk membuat akun pasien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Gmail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                    title="Harap masukkan alamat Gmail yang valid"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    id="nik"
                    name="nik"
                    placeholder="Masukkan 16 digit NIK"
                    value={formData.nik}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{16}"
                    title="NIK harus 16 digit angka"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Nomor HP</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Contoh: 08123456789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    pattern="08[0-9]{9,10}"
                    title="Nomor HP harus diawali 08 dan terdiri dari 10-11 digit"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Tanggal Lahir</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    required
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Masukkan alamat lengkap"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan ulang password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
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
              </div>

              <Button type="submit" className="w-full">
                Daftar
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Masuk sekarang
              </Link>
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