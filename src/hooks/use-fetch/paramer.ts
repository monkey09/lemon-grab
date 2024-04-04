import { Paramer } from "./types"

export const paramer: Paramer = (params) => {
  let url = ''
  Object.entries(params).forEach(([key, value], i) => 
    i === 0 ? url += `?${key}=${value}` : url += `&${key}=${value}`)
  return url
}