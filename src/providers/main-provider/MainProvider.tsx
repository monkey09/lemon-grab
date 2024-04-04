import { MainProviderProps } from "./types"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "../theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DirectionProvider } from "../direction-provider"
import { ReactQueryProvider } from "../react-query-provider"

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <ReactQueryProvider>
        <DirectionProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <Toaster />
          </TooltipProvider>
        </DirectionProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}