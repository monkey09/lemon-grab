"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { registerServiceWorker } from "./serviceWorker"
import { getCurrentPushSubscription, pushSubscriptionToServer } from "./utils"

export const PushInit = () => {
  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker()
      } catch (error) {
        toast("Service workers are not supported by this browser")
      }
    }
    setUpServiceWorker()
  }, [])

  useEffect(() => {
    async function syncPushSubscription() {
      try {
        const subscription = await getCurrentPushSubscription()
        if (subscription) {
          await pushSubscriptionToServer(subscription, "PUT")
        }
      } catch (error) {
        toast("Failed to send push subscription to server")
      }
    }
    syncPushSubscription()
  }, [])
  return null
}