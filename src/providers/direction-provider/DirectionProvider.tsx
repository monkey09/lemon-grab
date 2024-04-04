"use client"

import { useDirection } from "@/hooks"
import { DirectionProviderProps } from "./types"
import { DirectionProvider as $DirectionProvider } from '@radix-ui/react-direction'

export const DirectionProvider = ({ children }: DirectionProviderProps) => {
  return (
    <$DirectionProvider dir={useDirection()}>
      {children}
    </$DirectionProvider>
  )
}