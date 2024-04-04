"use client"

import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          onClick={() => 
            resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        الوضع
      </TooltipContent>
    </Tooltip>
  )
}
