import { NextResponse } from "next/server"

// Dummy data for dashboard stats
const dashboardStats = {
  todayReferrals: {
    count: 12,
    change: 3,
    changeText: "+3 dari kemarin"
  },
  pendingConfirmation: {
    count: 5,
    averageTime: "1.5 jam",
    changeText: "Rata-rata 1.5 jam"
  },
  acceptedReferrals: {
    count: 8,
    rate: "67%",
    changeText: "67% acceptance rate"
  },
  activePatients: {
    count: 156,
    newPatients: 12,
    changeText: "+12 pasien baru"
  }
}

// GET /api/stats
export async function GET() {
  return NextResponse.json(dashboardStats)
} 