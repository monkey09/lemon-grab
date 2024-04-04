export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) throw Error()
  await navigator.serviceWorker.register("/serviceWorker.js")
}

export async function getReadyServiceWorker() {
  if (!("serviceWorker" in navigator)) throw Error()
  return navigator.serviceWorker.ready
}