"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  FileText,
  CheckCircle,
  Heart,
  Bell,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Download,
  Eye,
  MessageCircle,
  Pill,
  Stethoscope,
} from "lucide-react"

export default function PasienDashboard() {
  const [activeTab, setActiveTab] = useState("rujukan")

  const referralHistory = [
    {
      id: "REF001",
      condition: "Hipertensi Berat",
      fromPuskesmas: "Puskesmas Setiabudi",
      toHospital: "RSUD Dr. Soetomo",
      status: "completed",
      date: "2025-01-10",
      doctor: "Dr. Sarah Amelia",
      notes: "Rujukan berhasil, pasien telah mendapat penanganan di RS",
    },
    {
      id: "REF002",
      condition: "Kontrol Diabetes",
      fromPuskesmas: "Puskesmas Setiabudi",
      toHospital: "RS Airlangga",
      status: "in-progress",
      date: "2025-01-15",
      doctor: "Dr. Sarah Amelia",
      notes: "Sedang dalam proses pemeriksaan lanjutan",
    },
  ]

  const appointments = [
    {
      id: "APT001",
      date: "2025-01-20",
      time: "09:00",
      doctor: "Dr. Ahmad Fauzi",
      hospital: "RSUD Dr. Soetomo",
      type: "Kontrol Rutin",
      status: "scheduled",
    },
    {
      id: "APT002",
      date: "2025-01-25",
      time: "14:30",
      doctor: "Dr. Siti Rahmawati",
      hospital: "RS Airlangga",
      type: "Konsultasi Spesialis",
      status: "scheduled",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Selesai
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Berlangsung
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-600">
            Terjadwal
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SehatPedia</h1>
              <p className="text-xs text-gray-600">Portal Pasien</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Ahmad Wijaya</p>
                <p className="text-gray-500">Pasien</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, Ahmad</h1>
          <p className="text-gray-600">Pantau status rujukan dan jadwal pemeriksaan Anda</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rujukan Aktif</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Sedang berlangsung</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal Mendatang</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Dalam 7 hari</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riwayat Rujukan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Total rujukan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesan Baru</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Dari dokter</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rujukan">Rujukan Saya</TabsTrigger>
            <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat Medis</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="rujukan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Rujukan</CardTitle>
                <CardDescription>Pantau perkembangan rujukan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralHistory.map((referral) => (
                    <div key={referral.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{referral.condition}</h3>
                          <p className="text-sm text-gray-600">ID: {referral.id}</p>
                        </div>
                        {getStatusBadge(referral.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">Dari: {referral.fromPuskesmas}</p>
                            <p className="text-sm text-gray-600">Ke: {referral.toHospital}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{referral.doctor}</p>
                            <p className="text-sm text-gray-600">{referral.date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">{referral.notes}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Unduh
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Pesan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jadwal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Pemeriksaan</CardTitle>
                <CardDescription>Jadwal konsultasi dan pemeriksaan mendatang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                          <p className="text-sm text-gray-600">ID: {appointment.id}</p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-gray-600">Dokter</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{appointment.hospital}</p>
                            <p className="text-sm text-gray-600">Rumah Sakit</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Hubungi RS
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          Batalkan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="riwayat" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Pemeriksaan</CardTitle>
                  <CardDescription>Catatan medis dan hasil pemeriksaan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Pemeriksaan Hipertensi</h4>
                        <span className="text-sm text-gray-500">15 Jan 2025</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Tekanan darah: 140/90 mmHg</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Tes Gula Darah</h4>
                        <span className="text-sm text-gray-500">10 Jan 2025</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Gula darah puasa: 110 mg/dL</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Obat & Resep</CardTitle>
                  <CardDescription>Daftar obat yang sedang dikonsumsi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Pill className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Amlodipine 5mg</h4>
                          <p className="text-sm text-gray-600">1x sehari, setelah makan</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Aktif
                      </Badge>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Pill className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Metformin 500mg</h4>
                          <p className="text-sm text-gray-600">2x sehari, sebelum makan</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Aktif
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profil" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>Data diri dan kontak</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <p className="text-gray-900">Ahmad Wijaya</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">NIK</label>
                    <p className="text-gray-900">3174012345678901</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                    <p className="text-gray-900">15 Maret 1985</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">No. Telepon</label>
                    <p className="text-gray-900">+62 812-3456-7890</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">ahmad.wijaya@email.com</p>
                  </div>
                  <Button variant="outline">Edit Profil</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informasi BPJS</CardTitle>
                  <CardDescription>Data kepesertaan BPJS Kesehatan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">No. Kartu BPJS</label>
                    <p className="text-gray-900">0001234567890</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Kelas Perawatan</label>
                    <p className="text-gray-900">Kelas II</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status Kepesertaan</label>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Aktif
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Faskes Tingkat I</label>
                    <p className="text-gray-900">Puskesmas Setiabudi</p>
                  </div>
                  <Button variant="outline">Update BPJS</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
