"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Building2,
  FileText,
  Heart,
  Bell,
  Settings,
  User,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  Filter,
} from "lucide-react"

export default function DinkesDashboard() {
  const regionalStats = [
    { region: "Jakarta Barat", puskesmas: 25, hospitals: 8, referrals: 1250, efficiency: 85 },
    { region: "Jakarta Pusat", puskesmas: 18, hospitals: 12, referrals: 980, efficiency: 92 },
    { region: "Jakarta Selatan", puskesmas: 22, hospitals: 15, referrals: 1450, efficiency: 88 },
    { region: "Jakarta Timur", puskesmas: 28, hospitals: 10, referrals: 1320, efficiency: 83 },
    { region: "Jakarta Utara", puskesmas: 20, hospitals: 7, referrals: 890, efficiency: 90 },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Kapasitas ICU Rendah",
      description: "RSUD Dr. Soetomo - ICU hampir penuh (18/20)",
      time: "2 jam lalu",
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      title: "Peningkatan Rujukan",
      description: "Wilayah Jakarta Selatan mengalami peningkatan rujukan 15%",
      time: "4 jam lalu",
      priority: "medium",
    },
    {
      id: 3,
      type: "success",
      title: "Integrasi Berhasil",
      description: "RS Airlangga berhasil terintegrasi dengan sistem",
      time: "1 hari lalu",
      priority: "low",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case "info":
        return <Activity className="w-5 h-5 text-blue-600" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Tinggi</Badge>
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
              <p className="text-xs text-gray-600">Dinas Kesehatan DKI Jakarta</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge className="ml-1 bg-red-500 text-white text-xs">5</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Dr. Bambang Sutrisno</p>
                <p className="text-gray-500">Kepala Dinkes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Dinas Kesehatan</h1>
          <p className="text-gray-600">Monitoring dan analisis sistem rujukan kesehatan regional</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Puskesmas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">113</div>
              <p className="text-xs text-muted-foreground">Terdaftar aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rumah Sakit</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52</div>
              <p className="text-xs text-muted-foreground">Terintegrasi sistem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rujukan Bulan Ini</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,890</div>
              <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efisiensi Sistem</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.6%</div>
              <p className="text-xs text-muted-foreground">Target: 85%</p>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Alert Sistem</CardTitle>
            <CardDescription>Notifikasi penting yang memerlukan perhatian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getPriorityBadge(alert.priority)}
                    <Button variant="outline" size="sm">
                      Tindak Lanjut
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="regional" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="regional">Data Regional</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="faskes">Faskes</TabsTrigger>
            <TabsTrigger value="laporan">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Statistik Regional</CardTitle>
                    <CardDescription>Data rujukan per wilayah DKI Jakarta</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalStats.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-medium text-gray-900">{region.region}</h3>
                        </div>
                        <Badge variant={region.efficiency >= 85 ? "default" : "secondary"}>
                          Efisiensi: {region.efficiency}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{region.puskesmas}</div>
                          <div className="text-xs text-gray-600">Puskesmas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{region.hospitals}</div>
                          <div className="text-xs text-gray-600">Rumah Sakit</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{region.referrals}</div>
                          <div className="text-xs text-gray-600">Rujukan/Bulan</div>
                        </div>
                        <div className="text-center">
                          <Button variant="outline" size="sm">
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Rujukan</CardTitle>
                  <CardDescription>Grafik rujukan 6 bulan terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Grafik analytics akan segera tersedia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Penyakit</CardTitle>
                  <CardDescription>Top 10 kondisi rujukan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { condition: "Hipertensi", count: 1250, percentage: 21 },
                      { condition: "Diabetes Mellitus", count: 980, percentage: 17 },
                      { condition: "Penyakit Jantung", count: 750, percentage: 13 },
                      { condition: "Stroke", count: 620, percentage: 11 },
                      { condition: "Pneumonia", count: 450, percentage: 8 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.condition}</p>
                          <p className="text-xs text-gray-600">{item.count} kasus</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${item.percentage * 4}px` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faskes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Fasilitas Kesehatan</CardTitle>
                <CardDescription>Kelola dan monitor fasilitas kesehatan terdaftar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fitur manajemen faskes akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laporan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Komprehensif</CardTitle>
                <CardDescription>Generate laporan sistem rujukan untuk berbagai keperluan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Laporan Bulanan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span className="text-sm">Analisis Kinerja</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span className="text-sm">Tren Regional</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
