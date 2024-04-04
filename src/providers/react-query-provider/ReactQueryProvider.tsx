"use client"

import { useState } from "react"
import { ReactQueryProviderProps } from "./types"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}