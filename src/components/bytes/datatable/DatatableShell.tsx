import { DatatableShellProps } from "./types"
import { useEffect, useRef, useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const DatatableShell = ({ children, footer, header }: DatatableShellProps) => {
  const bd = useRef<HTMLDivElement>(null)
  const ft = useRef<HTMLDivElement>(null)
  const [margin, setMargin] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    bd && bd.current && setMargin(bd.current.getBoundingClientRect().top)
  }, [])

  useEffect(() => {
    ft && ft.current && setHeight(ft.current.getBoundingClientRect().height)
  }, [])

  return (
    <>
      <div className="mb-3">{header}</div>
      <div 
        ref={bd} 
        className="rounded-md border" 
        style={{height: `calc(100dvh - ${margin}px - ${height}px)`}} 
      >
        <ScrollArea className="w-full h-full">
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div ref={ft}>{footer}</div>
    </> 
  )
}