"use client"

import { 
  registerPushNotifications, 
  getCurrentPushSubscription, 
  unregisterPushNotifications,
} from "./utils"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BellOff, BellRing } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const PushToggle = () => {
  const [
    hasActivePushSubscription, 
    setHasActivePushSubscription
  ] = useState<boolean>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription()
      setHasActivePushSubscription(!!subscription)
    }
    getActivePushSubscription()
  }, [])

  async function setPushNotificationsEnabled(enabled: boolean) {
    if (loading) return

    setLoading(true)

    try {
      if (enabled) {
        await registerPushNotifications()
      } else {
        await unregisterPushNotifications()
      }
      toast("Push notifications " + (enabled ? "enabled" : "disabled"))
      setHasActivePushSubscription(enabled)
    } catch (error) {
      if (enabled && Notification.permission === "denied") {
        toast("Please enable push notifications in your browser settings")
      } else {
        toast("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          loading={loading}
          onClick={() => setPushNotificationsEnabled(!hasActivePushSubscription)}
        >
          {hasActivePushSubscription ? (
            <BellOff className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <BellRing className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasActivePushSubscription ? "الإشعارات مفعلة" : "الإشعارات غير مفعلة"}
      </TooltipContent>
    </Tooltip>
  )
}