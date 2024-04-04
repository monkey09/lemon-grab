import { UseFetch } from "./types"
import { fetcher } from "./fetcher"
import { paramer } from "./paramer"
import { useQuery } from "@tanstack/react-query"

export const useFetch: UseFetch = ({ 
  keys, url, auth=true, params, ...args 
}) => useQuery({
  queryFn: async () => await fetcher({
    url: params ? url + paramer(params) : url, 
    auth
  }),
  queryKey: keys,
  ...args
})