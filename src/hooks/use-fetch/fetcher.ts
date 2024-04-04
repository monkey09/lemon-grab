import Cookies from "js-cookie"
import { FetcherProps, Options } from "./types"

export const fetcher = async ({ url, auth }: FetcherProps) => {
  const token = Cookies.get("token")
  const options: Options = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  }

  auth && (options.headers.Authorization = `Bearer ${token}`)

  return fetch(`${process.env.BASE_URL}${url}`, options)
  .then(async (response) => {
    const res = await response.json()
    if (res.is_success) return res
    else throw {knowen: res.message}
  }).catch(error => {throw error.knowen || "حدث خطأ ما"})
}