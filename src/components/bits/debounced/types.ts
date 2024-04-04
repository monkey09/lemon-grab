import { InputHTMLAttributes } from "react"

export type DebouncedProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>