"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReferralForm } from "./ReferralForm"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ReferralModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ReferralModal({ open, onOpenChange, onSuccess }: ReferralModalProps) {
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", values)
      
      // Close the modal
      onOpenChange(false)
      
      // Show success message
      toast.success("Rujukan berhasil dibuat!")
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
      
      // Force a refresh of the page data
      router.refresh()
      
      // Force a hard refresh after a short delay to ensure data is updated
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error) {
      console.error("Error submitting referral:", error)
      toast.error("Gagal membuat rujukan. Silakan coba lagi.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Buat Rujukan Baru</DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk membuat rujukan baru. Pastikan semua informasi yang diisi sudah benar.
          </DialogDescription>
        </DialogHeader>
        <ReferralForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
} 