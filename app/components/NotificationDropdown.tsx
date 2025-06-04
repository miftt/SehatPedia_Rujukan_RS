"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { getNotifications, markNotificationAsRead } from "@/app/lib/api"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Notification {
  id: string
  title: string
  message: string
  type: "referral" | "status" | "reminder"
  isRead: boolean
  createdAt: string
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const unreadCount = notifications.filter(n => !n.isRead).length

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }
    fetchNotifications()
  }, [])

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await markNotificationAsRead(notification.id)
        setNotifications(notifications.map(n => 
          n.id === notification.id ? { ...n, isRead: true } : n
        ))
      } catch (error) {
        console.error("Error marking notification as read:", error)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 mt-2"
        sideOffset={5}
        alignOffset={0}
        side="bottom"
      >
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Tidak ada notifikasi
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer border-b last:border-b-0 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.createdAt), { 
                        addSuffix: true,
                        locale: id 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 