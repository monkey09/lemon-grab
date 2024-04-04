"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const LangToggle = () => {
  const [, locale, ...segments]  = usePathname().split("/")
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Link 
            href={`${locale === "en" ? "/ar" : "/en"}/${segments.join("/")}`}
            className="h-full w-full flex items-center justify-center"
          >
            {locale === "en" ? "AR" : "EN"}
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        اللغة
      </TooltipContent>
    </Tooltip>
  )
}