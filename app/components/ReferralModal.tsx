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

interface ReferralModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReferralModal({ open, onOpenChange }: ReferralModalProps) {
  const handleSubmit = async (values: any) => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", values)
    
    // Show success message
    toast.success("Rujukan berhasil dibuat!")
    
    // Close the modal
    onOpenChange(false)
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