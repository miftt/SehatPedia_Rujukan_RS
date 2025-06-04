export interface Hospital {
  id: string
  name: string
  specialty: string
  distance: string
  available: boolean
}

export interface Referral {
  id: string
  patientName: string
  condition: string
  hospital: string
  status: "pending" | "accepted" | "completed"
  date: string
  urgency: "low" | "medium" | "high"
}

export interface DashboardStats {
  todayReferrals: {
    count: number
    change: number
    changeText: string
  }
  pendingConfirmation: {
    count: number
    averageTime: string
    changeText: string
  }
  acceptedReferrals: {
    count: number
    rate: string
    changeText: string
  }
  activePatients: {
    count: number
    newPatients: number
    changeText: string
  }
} 