import { NextResponse } from "next/server"

// Dummy notifications data
const notifications = [
  {
    id: "n1",
    title: "Rujukan Baru",
    message: "Rujukan baru dari Puskesmas Setiabudi untuk pasien Ahmad Wijaya",
    type: "referral",
    isRead: false,
    createdAt: "2025-06-03T08:30:00Z"
  },
  {
    id: "n2",
    title: "Status Rujukan",
    message: "Rujukan untuk Siti Nurhaliza telah diterima oleh RS Airlangga",
    type: "status",
    isRead: false,
    createdAt: "2025-06-04T07:15:00Z"
  },
  {
    id: "n3",
    title: "Pengingat",
    message: "3 rujukan menunggu konfirmasi dari lebih dari 2 jam",
    type: "reminder",
    isRead: true,
    createdAt: "2025-06-03T06:00:00Z"
  }
]

// GET /api/notifications
export async function GET() {
  return NextResponse.json(notifications)
}

// PATCH /api/notifications/:id/read
export async function PATCH(request: Request) {
  try {
    const id = request.url.split('/').pop()
    const notificationIndex = notifications.findIndex(n => n.id === id)
    
    if (notificationIndex === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    notifications[notificationIndex].isRead = true
    return NextResponse.json(notifications[notificationIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
} 