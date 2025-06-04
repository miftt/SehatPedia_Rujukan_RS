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
      {/* Header - Made more compact on mobile */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">SehatPedia</h1>
                <p className="text-xs text-gray-600">Puskesmas Setiabudi</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto justify-end">
              <NotificationDropdown />
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden sm:block text-sm">
                  <p className="font-medium">Dr. Sarah Amelia</p>
                  <p className="text-gray-500 text-xs">Dokter Umum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Welcome Section - Responsive text sizes */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Dashboard Puskesmas</h1>
          <p className="text-sm md:text-base text-gray-600">Kelola rujukan pasien dan koordinasi dengan rumah sakit</p>
        </div>

        {/* Stats Cards - Responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Rujukan Hari Ini</CardTitle>
              <FileText className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg md:text-2xl font-bold">{stats.todayReferrals.count}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground">{stats.todayReferrals.changeText}</p>
            </CardContent>
          </Card>

          <Card className="p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Menunggu</CardTitle>
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg md:text-2xl font-bold">{stats.pendingConfirmation.count}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground">{stats.pendingConfirmation.changeText}</p>
            </CardContent>
          </Card>

          <Card className="p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Diterima</CardTitle>
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg md:text-2xl font-bold">{stats.acceptedReferrals.count}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground">{stats.acceptedReferrals.changeText}</p>
            </CardContent>
          </Card>

          <Card className="p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Pasien Aktif</CardTitle>
              <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg md:text-2xl font-bold">{stats.activePatients.count}</div>
              <p className="text-[10px] md:text-xs text-muted-foreground">{stats.activePatients.changeText}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rujukan" className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex w-full md:w-auto h-9 md:h-10 items-center justify-start md:justify-center text-muted-foreground rounded-lg p-1">
              <TabsTrigger value="rujukan" className="text-xs md:text-sm px-2.5 md:px-3">Rujukan</TabsTrigger>
              <TabsTrigger value="pasien" className="text-xs md:text-sm px-2.5 md:px-3">Pasien</TabsTrigger>
              <TabsTrigger value="rumah-sakit" className="text-xs md:text-sm px-2.5 md:px-3">Rumah Sakit</TabsTrigger>
              <TabsTrigger value="laporan" className="text-xs md:text-sm px-2.5 md:px-3">Laporan</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="rujukan" className="space-y-4 md:space-y-6">
            {/* Quick Actions - Responsive layout */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Button onClick={() => setIsModalOpen(true)} className="text-xs md:text-sm h-8 md:h-10">
                  Buat Rujukan
                </Button>
                <Button variant="outline" className="text-xs md:text-sm h-8 md:h-10">
                  <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="text-xs md:text-sm h-8 md:h-10">
                  <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Export
                </Button>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                <Input
                  placeholder="Cari rujukan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 md:pl-9 text-xs md:text-sm h-8 md:h-10"
                />
              </div>
            </div>

            {/* Referrals List - Responsive table */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Rujukan Terbaru</CardTitle>
                <CardDescription className="text-xs md:text-sm">Daftar rujukan yang telah dibuat hari ini</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {referrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="p-3 md:p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                        <div className="flex items-start md:items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm md:text-base text-gray-900 truncate">{referral.patientName}</h3>
                            <p className="text-xs md:text-sm text-gray-600 truncate">{referral.condition}</p>
                            <div className="flex items-center mt-1">
                              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="ml-1 text-xs text-gray-500 truncate">{referral.hospital}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex flex-wrap gap-1.5">
                              <Badge 
                                variant="outline" 
                                className="text-[10px] md:text-xs px-1.5 py-0 h-5"
                              >
                                {referral.status === "pending" ? "Menunggu" : 
                                 referral.status === "accepted" ? "Diterima" : "Selesai"}
                              </Badge>
                              {referral.urgency === "high" && (
                                <Badge 
                                  variant="destructive"
                                  className="text-[10px] md:text-xs px-1.5 py-0 h-5"
                                >
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-[10px] md:text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                              {referral.date}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDetailClick(referral)}
                            className="text-xs h-7 md:h-8 px-2 md:px-3"
                          >
                            Detail
                          </Button>
                        </div>
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
