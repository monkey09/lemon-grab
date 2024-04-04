import Cookies from "js-cookie"
import { getReadyServiceWorker } from "./serviceWorker"

const applicationServerKey = process.env.SERVER_KEY!
const url = `${process.env.BASE_URL}admin/admin/v1/subscribe-web-notification`

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const sw = await getReadyServiceWorker()
  return sw.pushManager.getSubscription()
}

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function registerPushNotifications() {
  if (!("PushManager" in window)) throw Error()
  const existingSubscription = await getCurrentPushSubscription()
  if (existingSubscription) throw Error()
  const sw = await getReadyServiceWorker()
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
  })
  await pushSubscriptionToServer(subscription, "POST")
}

export async function unregisterPushNotifications() {
  const existingSubscription = await getCurrentPushSubscription()
  if (!existingSubscription) throw Error()
  await pushSubscriptionToServer(existingSubscription, "DELETE")
  await existingSubscription.unsubscribe()
}

export async function pushSubscriptionToServer(
  subscription: PushSubscription,
  method: "POST" | "PUT" | "DELETE"
) {
  const key = subscription.getKey('p256dh')
  const token = subscription.getKey('auth')
  const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0]
  const response = await fetch(url, {
    method,
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      //@ts-ignore
      publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
      //@ts-ignore
      authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
      device_type: window.navigator.userAgent,
      token_type: 'webpush',
      contentEncoding
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
  if (!response.ok) throw Error()
}