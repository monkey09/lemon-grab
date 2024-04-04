// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
  globalThis
)

sw.addEventListener("push", (event) => {
  async function handlePushEvent(message) {
    const content = message.split('::')
    await sw.registration.showNotification(content[0], {
      body: content[1],
      icon: "/favicon/monkey.png",
      actions: [{ title: "Open notifications", action: "open_notifications" }],
      tag: Date.now().toString()
    })
  }
  if (event.data) {
    const message = event.data.text()
    event.waitUntil(handlePushEvent(message))
  }
})

sw.addEventListener("notificationclick", (event) => {
  const notification = event.notification
  notification.close()
  async function handleNotificationClick() {
    sw.clients.openWindow("/")
  }
  event.waitUntil(handleNotificationClick())
})