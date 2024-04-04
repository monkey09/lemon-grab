"use client"

import { DebouncedProps } from "./types"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

export const Debounced = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input 
      {...props} 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  )
}