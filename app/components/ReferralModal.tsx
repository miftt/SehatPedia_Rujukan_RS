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
import { createReferral } from "@/app/lib/api"

interface ReferralModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ReferralModal({ open, onOpenChange, onSuccess }: ReferralModalProps) {
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    try {
      // Attempt to create the referral
      const result = await createReferral(values)
      if (!result) {
        throw new Error("Failed to create referral")
      }

      // Only close modal and refresh after successful creation
      onOpenChange(false)
      
      // Show success message
      toast.success("Rujukan berhasil dibuat!", {
        duration: 3000
      })
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
      
      // Wait for toast to be visible before refreshing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Refresh the data
      router.refresh()
    } catch (error) {
      console.error("Error submitting referral:", error)
      toast.error("Gagal membuat rujukan. Silakan coba lagi.", {
        duration: 3000
      })
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