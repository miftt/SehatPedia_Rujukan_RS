import { Hospital, Referral, DashboardStats } from "@/types"

const API_BASE_URL = "/api"

// Function to handle API errors
const handleApiError = (error: any) => {
  console.error("API Error:", error)
  throw new Error("Failed to fetch data from API")
}

// Fetch all hospitals
export const getHospitals = async (): Promise<Hospital[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals`)
    if (!response.ok) throw new Error("Failed to fetch hospitals")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
}

// Fetch all referrals
export const getReferrals = async (): Promise<Referral[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/referrals`)
    if (!response.ok) throw new Error("Failed to fetch referrals")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
}

// Create a new referral
export const createReferral = async (referralData: Omit<Referral, "id" | "status" | "date">): Promise<Referral> => {
  try {
    const response = await fetch(`${API_BASE_URL}/referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(referralData),
    })
    if (!response.ok) throw new Error("Failed to create referral")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
}

// Fetch dashboard stats
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`)
    if (!response.ok) throw new Error("Failed to fetch dashboard stats")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
}

// Fetch notifications
export const getNotifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`)
    if (!response.ok) throw new Error("Failed to fetch notifications")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
}

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: "PATCH"
    })
    if (!response.ok) throw new Error("Failed to update notification")
    return response.json()
  } catch (error) {
    return handleApiError(error)
  }
} 