import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { mainFont } from "@/config"
import type { Metadata } from "next"
import { useDirection } from "@/hooks"
import { MainProvider } from "@/providers"

export interface RootLayoutProps {
  children: React.ReactNode
  params: {locale: string}
}

export const metadata: Metadata = {
  title: "Townsand Director",
  description: "Dashbords Boilerplate",
  icons: { icon: '/favicon/monkey.png'}
}

const RootLayout = ({ children, params: {locale} }: Readonly<RootLayoutProps>) => {
  return (
    <html 
      lang={locale}
      dir={useDirection()}
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body 
        suppressHydrationWarning
        className={cn(
          "font-sans antialiased",
          mainFont.variable
        )}
      >
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  )
}

export default RootLayout