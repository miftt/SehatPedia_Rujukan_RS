import { NextResponse } from "next/server"

// Dummy data for referrals
const recentReferrals = [
  {
    id: "REF001",
    patientName: "Ahmad Wijaya",
    condition: "Hipertensi Berat",
    hospital: "RSUD Dr. Soetomo",
    status: "pending",
    date: "2025-01-15",
    urgency: "high",
  },
  {
    id: "REF002",
    patientName: "Siti Nurhaliza",
    condition: "Diabetes Mellitus",
    hospital: "RS Airlangga",
    status: "accepted",
    date: "2025-01-15",
    urgency: "medium",
  },
  {
    id: "REF003",
    patientName: "Budi Santoso",
    condition: "Fraktur Femur",
    hospital: "RS Orthopedi",
    status: "completed",
    date: "2025-01-14",
    urgency: "high",
  },
]

// GET /api/referrals
export async function GET() {
  return NextResponse.json(recentReferrals)
}

// POST /api/referrals
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newReferral = {
      id: `REF${String(recentReferrals.length + 1).padStart(3, "0")}`,
      ...body,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    }
    recentReferrals.push(newReferral)
    return NextResponse.json(newReferral, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create referral" },
      { status: 500 }
    )
  }
} 