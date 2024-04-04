import { 
  QueryKey,
  UseQueryResult, 
  UseQueryOptions, 
} from "@tanstack/react-query"

export interface Options extends RequestInit {
  method: "GET"
  headers: {
    "Content-Type": "application/json"
    Authorization?: `Bearer ${string}`
  }
}

interface TableFetchResponse<T extends unknown[]> {
  // pages: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  // filter: (keyof T[number])[]
  filter: string[]
  actions: Record<string, boolean>
  columns: {[key in keyof T[number]]: {
    type: string
    visible: boolean
    grid_view: boolean
    validation: string
  }}
}

interface DataFetchResponse<T> {
  data: T
  message: string
  is_success: boolean
}

type FetchResponse<T> = T extends unknown[]
  ? DataFetchResponse<T> & TableFetchResponse<T> 
  : DataFetchResponse<T>

interface UseFetchProps<F, T> extends Omit
  <UseQueryOptions<FetchResponse<F>, string, FetchResponse<T>, QueryKey>,
  "queryFn" | "queryKey"> {
  url: string
  keys: QueryKey
  auth?: boolean
  params?: Record<string, string | number>
}

export interface Paramer {
  (params: Record<string, string | number>): string
}

export interface UseFetch {
  <F, T=F>(args: UseFetchProps<F, T>): 
  UseQueryResult<FetchResponse<T>, string>
}

export interface FetcherProps {
  url: string
  auth: boolean
}