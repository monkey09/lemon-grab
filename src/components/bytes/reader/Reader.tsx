"use client"

import { ReaderProps } from "./types"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReactToPrint } from "react-to-print"
import { useEffect, useRef, useState } from "react"
import { BrowserQRCodeSvgWriter } from "@zxing/library"

export const Reader = ({ text }: ReaderProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [svgHtml, setSvgHtml] = useState<SVGSVGElement[]>()
  const print = useReactToPrint({content: () => ref.current})

  useEffect(() => {
    const codeWriter = new BrowserQRCodeSvgWriter()
    const svgElement = text.map(item => codeWriter.write(item, 198, 198)) 
    setSvgHtml(svgElement)
  }, [])

  return svgHtml && svgHtml.length > 0 ? (
    <div className="w-[200px] flex flex-col space-y-5">
      <Button variant="outline" onClick={() => ref.current && print()}>
        <Printer className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <div ref={ref}>
        {svgHtml.map((item, i) => (
          <div key={i} className="flex items-center justify-center">
            <div 
              className="bg-white rounded border"
              dangerouslySetInnerHTML={{__html: item.outerHTML }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  ) : null
}