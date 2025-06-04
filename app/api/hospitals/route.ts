import { NextResponse } from "next/server"

// Dummy data for hospitals
const hospitals = [
  { 
    id: "rs1",
    name: "RSUD Dr. Soetomo", 
    specialty: "Umum", 
    distance: "2.5 km", 
    available: true 
  },
  { 
    id: "rs2",
    name: "RS Airlangga", 
    specialty: "Jantung", 
    distance: "3.2 km", 
    available: true 
  },
  { 
    id: "rs3",
    name: "RS Orthopedi", 
    specialty: "Tulang", 
    distance: "4.1 km", 
    available: false 
  },
  { 
    id: "rs4",
    name: "RS Mata Undaan", 
    specialty: "Mata", 
    distance: "1.8 km", 
    available: true 
  },
]

// GET /api/hospitals
export async function GET() {
  return NextResponse.json(hospitals)
} 