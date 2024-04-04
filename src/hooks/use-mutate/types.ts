import { 
  MutationKey,
  UseMutationResult, 
  UseMutationOptions,
} from "@tanstack/react-query"

interface Method {
  method: "POST" | "PUT" | "DELETE"
}

export interface Options extends Omit<RequestInit, "method">, Method {
  headers: {
    "Content-Type"?: "application/json"
    Authorization?: `Bearer ${string}`
  }
  body?: string | FormData
}

interface MutateResponse<T> {
  data: T
  message: string
  is_success: boolean
}

interface UseMutateProps<T> extends Omit
  <UseMutationOptions<MutateResponse<T>, 
  string, MutateProps, unknown>,
  "mutationFn" | "mutationKey"> {
  url: string
  keys?: MutationKey
  auth?: boolean
}

interface MutateProps extends Partial<Method> {
  body?: Record<string, unknown>
}

export interface UseMutate {
  <T>(args: UseMutateProps<T> & Partial<Method>): 
    UseMutationResult<MutateResponse<T>, 
    string, MutateProps, unknown>
}

export interface MutatorProps extends Method {
  url: string
  body?: Record<string, unknown>
  auth: boolean
}