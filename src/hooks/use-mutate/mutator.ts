import Cookies from "js-cookie"
import { useHasFiles, useFormData } from ".."
import { MutatorProps, Options } from "./types"

export const mutator = async ({ url, method, body, auth }: MutatorProps) => {
  const token = Cookies.get("token")
  const options: Options = {method, headers: {}}

  if (body) {
    if (useHasFiles(body)) {
      options.method = "POST"
      options.body = useFormData(body)
    } else {
      options.body = JSON.stringify(body)
      options.headers["Content-Type"] = "application/json"
    }
  }

  auth && (options.headers.Authorization = `Bearer ${token}`)

  return fetch(`${process.env.BASE_URL}${url}`, options)
  .then(async (response) => {
    const res = await response.json()
    if (res.is_success) return res
    else throw {knowen: res.message}
  }).catch(error => {throw error.knowen || "حدث خطأ ما"})
}