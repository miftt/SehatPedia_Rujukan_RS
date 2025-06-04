"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  Heart,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  User,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react"
import { ReferralForm } from "../../components/ReferralForm"
import { Hospital, Referral, DashboardStats } from "@/app/types"
import { getHospitals, getReferrals, getDashboardStats } from "@/app/lib/api"
import { NotificationDropdown } from "@/app/components/NotificationDropdown"
import { ReferralModal } from "@/app/components/ReferralModal"
import { ReferralDetail } from "@/app/components/ReferralDetail"

export default function PuskesmasDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)

  const fetchData = async () => {
    try {
      const [statsData, referralsData, hospitalsData] = await Promise.all([
        getDashboardStats(),
        getReferrals(),
        getHospitals()
      ])
      setStats(statsData)
      setReferrals(referralsData)
      setHospitals(hospitalsData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleReferralSuccess = () => {
    // Refresh data after successful referral creation
    fetchData()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Menunggu
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Diterima
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Selesai
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

  const handleDetailClick = (referral: Referral) => {
    setSelectedReferral(referral)
    setIsDetailOpen(true)
  }

  if (!stats) {
    return <div>Loading...</div>
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
              <p className="text-xs text-gray-600">Puskesmas Setiabudi</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Dr. Sarah Amelia</p>
                <p className="text-gray-500">Dokter Umum</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Puskesmas</h1>
          <p className="text-gray-600">Kelola rujukan pasien dan koordinasi dengan rumah sakit</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rujukan Hari Ini</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayReferrals.count}</div>
              <p className="text-xs text-muted-foreground">{stats.todayReferrals.changeText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu Konfirmasi</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingConfirmation.count}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingConfirmation.changeText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rujukan Diterima</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.acceptedReferrals.count}</div>
              <p className="text-xs text-muted-foreground">{stats.acceptedReferrals.changeText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pasien Aktif</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePatients.count}</div>
              <p className="text-xs text-muted-foreground">{stats.activePatients.changeText}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rujukan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rujukan">Rujukan</TabsTrigger>
            <TabsTrigger value="pasien">Pasien</TabsTrigger>
            <TabsTrigger value="rumah-sakit">Rumah Sakit</TabsTrigger>
            <TabsTrigger value="laporan">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="rujukan" className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                <ReferralForm />
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

            {/* Referrals List */}
            <Card>
              <CardHeader>
                <CardTitle>Rujukan Terbaru</CardTitle>
                <CardDescription>Daftar rujukan yang telah dibuat hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{referral.patientName}</h3>
                          <p className="text-sm text-gray-600">{referral.condition}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{referral.hospital}</span>
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
                        <Button variant="outline" size="sm" onClick={() => handleDetailClick(referral)}>
                          Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pasien" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pasien</CardTitle>
                <CardDescription>Kelola data pasien dan riwayat medis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fitur manajemen pasien akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumah-sakit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rumah Sakit Rujukan</CardTitle>
                <CardDescription>Daftar rumah sakit yang tersedia untuk rujukan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospitals.map((hospital) => (
                    <div key={hospital.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{hospital.name}</h3>
                        <Badge variant={hospital.available ? "default" : "secondary"}>
                          {hospital.available ? "Tersedia" : "Penuh"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Spesialisasi: {hospital.specialty}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {hospital.distance}
                        </div>
                        <Button variant="outline" size="sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Hubungi
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laporan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan & Analisis</CardTitle>
                <CardDescription>Statistik rujukan dan performa puskesmas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fitur laporan dan analisis akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ReferralModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSuccess={handleReferralSuccess}
      />
      
      {selectedReferral && (
        <ReferralDetail
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          referral={selectedReferral}
        />
      )}
    </div>
  )
}
