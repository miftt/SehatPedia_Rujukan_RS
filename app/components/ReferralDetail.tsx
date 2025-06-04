"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Calendar, 
  MapPin, 
  Activity, 
  Clock, 
  Thermometer, 
  Heart, 
  Wind,
  FileText,
  Building2
} from "lucide-react"

interface ReferralDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  referral: {
    id: string
    patientName: string
    condition: string
    hospital: string
    status: string
    date: string
    urgency: string
    nik?: string
    birthDate?: string
    gender?: string
    address?: string
    symptoms?: string
    bloodPressure?: string
    heartRate?: string
    temperature?: string
    respiratoryRate?: string
    reason?: string
    notes?: string
  }
}

export function ReferralDetail({ open, onOpenChange, referral }: ReferralDetailProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Rujukan</DialogTitle>
          <DialogDescription>
            Informasi lengkap rujukan pasien
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{referral.patientName}</h3>
                <p className="text-gray-600">{referral.condition}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex space-x-2">
                {getStatusBadge(referral.status)}
                {getUrgencyBadge(referral.urgency)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {referral.date}
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Data Pasien</h4>
              <div className="space-y-2">
                {referral.nik && (
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">NIK:</span>
                    <span className="ml-2">{referral.nik}</span>
                  </div>
                )}
                {referral.birthDate && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Tanggal Lahir:</span>
                    <span className="ml-2">{referral.birthDate}</span>
                  </div>
                )}
                {referral.gender && (
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Jenis Kelamin:</span>
                    <span className="ml-2">{referral.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                  </div>
                )}
                {referral.address && (
                  <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                    <div>
                      <span className="text-gray-600">Alamat:</span>
                      <p className="mt-1">{referral.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Data Medis</h4>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <Activity className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                  <div>
                    <span className="text-gray-600">Diagnosis:</span>
                    <p className="mt-1">{referral.condition}</p>
                  </div>
                </div>
                {referral.symptoms && (
                  <div className="flex items-start text-sm">
                    <FileText className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                    <div>
                      <span className="text-gray-600">Gejala:</span>
                      <p className="mt-1">{referral.symptoms}</p>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {referral.bloodPressure && (
                    <div className="flex items-center text-sm">
                      <Activity className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Tekanan Darah:</span>
                      <span className="ml-2">{referral.bloodPressure}</span>
                    </div>
                  )}
                  {referral.heartRate && (
                    <div className="flex items-center text-sm">
                      <Heart className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Detak Jantung:</span>
                      <span className="ml-2">{referral.heartRate}</span>
                    </div>
                  )}
                  {referral.temperature && (
                    <div className="flex items-center text-sm">
                      <Thermometer className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Suhu:</span>
                      <span className="ml-2">{referral.temperature}°C</span>
                    </div>
                  )}
                  {referral.respiratoryRate && (
                    <div className="flex items-center text-sm">
                      <Wind className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Respirasi:</span>
                      <span className="ml-2">{referral.respiratoryRate}/min</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Referral Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Data Rujukan</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Rumah Sakit Tujuan:</span>
                  <span className="ml-2">{referral.hospital}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2">{getStatusBadge(referral.status)}</span>
                </div>
              </div>
              {referral.reason && (
                <div className="flex items-start text-sm">
                  <FileText className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                  <div>
                    <span className="text-gray-600">Alasan Rujukan:</span>
                    <p className="mt-1">{referral.reason}</p>
                  </div>
                </div>
              )}
            </div>
            {referral.notes && (
              <div className="mt-4">
                <div className="flex items-start text-sm">
                  <FileText className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                  <div>
                    <span className="text-gray-600">Catatan Tambahan:</span>
                    <p className="mt-1">{referral.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 