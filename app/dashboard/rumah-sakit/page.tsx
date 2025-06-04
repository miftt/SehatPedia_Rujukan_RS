"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  Users,
  Heart,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  User,
  Calendar,
  MapPin,
  Bed,
  Activity,
  AlertCircle,
} from "lucide-react"

export default function RumahSakitDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const incomingReferrals = [
    {
      id: "REF001",
      patientName: "Ahmad Wijaya",
      condition: "Hipertensi Berat",
      fromPuskesmas: "Puskesmas Setiabudi",
      status: "pending",
      date: "2025-01-15",
      urgency: "high",
      doctor: "Dr. Sarah Amelia",
    },
    {
      id: "REF004",
      patientName: "Maria Gonzalez",
      condition: "Pneumonia",
      fromPuskesmas: "Puskesmas Setiabudi",
      status: "pending",
      date: "2025-01-15",
      urgency: "medium",
      doctor: "Dr. Budi Hartono",
    },
    {
      id: "REF002",
      patientName: "Siti Nurhaliza",
      condition: "Diabetes Mellitus",
      fromPuskesmas: "Puskesmas Setiabudi",
      status: "accepted",
      date: "2025-01-15",
      urgency: "medium",
      doctor: "Dr. Sarah Amelia",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Menunggu Review
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Diterima
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">Urgent</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            Sedang
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Rendah
          </Badge>
        )
      default:
        return <Badge variant="outline">Normal</Badge>
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
              <p className="text-xs text-gray-600">RSUD Dr. Soetomo</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge className="ml-1 bg-red-500 text-white text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Dr. Ahmad Fauzi</p>
                <p className="text-gray-500">Dokter Spesialis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Rumah Sakit</h1>
          <p className="text-gray-600">Kelola rujukan masuk dan koordinasi dengan puskesmas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rujukan Masuk Hari Ini</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+5 dari kemarin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Perlu tindakan segera</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kapasitas Tempat Tidur</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">156/200 terisi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pasien Aktif</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+12 pasien baru</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Section */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Perhatian: Kapasitas ICU Hampir Penuh</p>
                <p className="text-sm text-orange-700">
                  ICU terisi 18/20 tempat tidur. Pertimbangkan rujukan ke RS lain untuk kasus non-urgent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="rujukan-masuk" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rujukan-masuk">Rujukan Masuk</TabsTrigger>
            <TabsTrigger value="kapasitas">Kapasitas</TabsTrigger>
            <TabsTrigger value="pasien">Pasien</TabsTrigger>
            <TabsTrigger value="laporan">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="rujukan-masuk" className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari rujukan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Incoming Referrals List */}
            <Card>
              <CardHeader>
                <CardTitle>Rujukan Masuk</CardTitle>
                <CardDescription>Daftar rujukan yang perlu ditinjau dan diproses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingReferrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{referral.patientName}</h3>
                          <p className="text-sm text-gray-600">{referral.condition}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{referral.fromPuskesmas}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{referral.doctor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            {getStatusBadge(referral.status)}
                            {getUrgencyBadge(referral.urgency)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {referral.date}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {referral.status === "pending" ? (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Terima
                              </Button>
                              <Button variant="outline" size="sm">
                                Tolak
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              Detail
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kapasitas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ruang Rawat Inap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kelas I</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">20/25</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kelas II</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-18 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">45/50</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kelas III</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-19 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">91/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ruang Khusus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ICU</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-18 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">18/20</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NICU</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">5/10</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Isolasi</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm">2/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Poliklinik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poli Jantung</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Tersedia
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poli Saraf</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Terbatas
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poli Anak</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Tersedia
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pasien" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pasien</CardTitle>
                <CardDescription>Kelola pasien yang sedang dirawat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fitur manajemen pasien akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laporan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan & Analisis</CardTitle>
                <CardDescription>Statistik rujukan dan performa rumah sakit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fitur laporan dan analisis akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
