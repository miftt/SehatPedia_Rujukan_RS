"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Hospital } from "@/app/types"
import { getHospitals, createReferral } from "@/app/lib/api"
import { toast } from "sonner"

interface ReferralFormProps {
  onSubmit?: (values: any) => Promise<void>
}

export function ReferralForm({ onSubmit }: ReferralFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [formData, setFormData] = useState({
    patientName: "",
    nik: "",
    birthDate: "",
    gender: "",
    address: "",
    diagnosis: "",
    symptoms: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    referralType: "",
    targetHospital: "",
    reason: "",
    notes: ""
  })
  const router = useRouter()

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalData = await getHospitals()
        setHospitals(hospitalData)
      } catch (error) {
        console.error("Error fetching hospitals:", error)
        toast.error("Gagal memuat data rumah sakit")
      }
    }
    fetchHospitals()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const selectedHospital = hospitals.find(h => h.id === formData.targetHospital)
      if (!selectedHospital) {
        toast.error("Rumah sakit tidak ditemukan")
        return
      }

      const referralData = {
        patientName: formData.patientName,
        condition: formData.diagnosis,
        hospital: selectedHospital.name,
        urgency: formData.referralType as "low" | "medium" | "high",
      }

      if (onSubmit) {
        await onSubmit(referralData)
      } else {
        await createReferral(referralData)
        router.refresh()
      }
      
      toast.success("Rujukan berhasil dibuat!", {
        description: `Pasien: ${formData.patientName}`
      })

      // Reset form
      setFormData({
        patientName: "",
        nik: "",
        birthDate: "",
        gender: "",
        address: "",
        diagnosis: "",
        symptoms: "",
        bloodPressure: "",
        heartRate: "",
        temperature: "",
        respiratoryRate: "",
        referralType: "",
        targetHospital: "",
        reason: "",
        notes: ""
      })
    } catch (error) {
      console.error("Error creating referral:", error)
      toast.error("Gagal membuat rujukan", {
        description: "Silakan coba lagi nanti"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Buat Rujukan Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Rujukan Baru</DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk membuat rujukan baru. Pastikan semua data terisi dengan benar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Data Pasien */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Data Pasien</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nama Pasien</Label>
                <Input 
                  id="patientName" 
                  placeholder="Masukkan nama lengkap" 
                  value={formData.patientName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nik">NIK</Label>
                <Input 
                  id="nik" 
                  placeholder="Nomor Induk Kependudukan" 
                  value={formData.nik}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Tanggal Lahir</Label>
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={formData.birthDate}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select 
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea 
                id="address" 
                placeholder="Alamat lengkap pasien" 
                value={formData.address}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          {/* Data Medis */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Data Medis</h3>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea 
                id="diagnosis" 
                placeholder="Diagnosis pasien" 
                value={formData.diagnosis}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Gejala</Label>
              <Textarea 
                id="symptoms" 
                placeholder="Gejala yang dialami" 
                value={formData.symptoms}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Tekanan Darah</Label>
                <Input 
                  id="bloodPressure" 
                  placeholder="Contoh: 120/80" 
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Detak Jantung</Label>
                <Input 
                  id="heartRate" 
                  placeholder="Detak per menit" 
                  value={formData.heartRate}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Suhu Tubuh</Label>
                <Input 
                  id="temperature" 
                  placeholder="Dalam °C" 
                  value={formData.temperature}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="respiratoryRate">Laju Pernapasan</Label>
                <Input 
                  id="respiratoryRate" 
                  placeholder="Napas per menit" 
                  value={formData.respiratoryRate}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Data Rujukan */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Data Rujukan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralType">Jenis Rujukan</Label>
                <Select 
                  value={formData.referralType}
                  onValueChange={(value) => handleSelectChange("referralType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis rujukan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Darurat</SelectItem>
                    <SelectItem value="planned">Terencana</SelectItem>
                    <SelectItem value="consultation">Konsultasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetHospital">Rumah Sakit Tujuan</Label>
                <Select 
                  value={formData.targetHospital}
                  onValueChange={(value) => handleSelectChange("targetHospital", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih rumah sakit" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name} - {hospital.specialty}
                        {!hospital.available && " (Tidak Tersedia)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Alasan Rujukan</Label>
              <Textarea 
                id="reason" 
                placeholder="Alasan melakukan rujukan" 
                value={formData.reason}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea 
                id="notes" 
                placeholder="Catatan tambahan jika ada" 
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogTrigger>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Rujukan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 