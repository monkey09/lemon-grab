"use client"

import { useDirection } from "@/hooks"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const locale = useLocale()
  const { theme = "system" } = useTheme()
  
  return (
    <Sonner
      richColors
      dir={useDirection()}
      className="toaster group"
      theme={theme as ToasterProps["theme"]}
      position={locale === "en" ? "bottom-right" : "bottom-left"}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-sans",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
