import { UseFormData } from "./types"

export const useFormData: UseFormData = (body) => {
  const data = []
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((j, i) => {
        formData.set(`${key}[${i}]`, j)
        data.push({[`${key}[${i}]`]: j})
      }) 
    } else {
      formData.set(key, value)
      data.push({[key]: value})
    }
  })
  return formData
}