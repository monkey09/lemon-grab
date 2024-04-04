import {
  Sheet,
  SheetTitle,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { useDirection } from "@/hooks"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const CartToggle = () => {
  return (
    <Tooltip>
      <Sheet>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
            >
              <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <SheetContent side={useDirection() === "ltr" ? "right" : "left"}>
          <SheetHeader>
            <SheetTitle>shopping cart</SheetTitle>
            <SheetDescription>
              shopping cart items
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <TooltipContent>
        العربة
      </TooltipContent>
    </Tooltip>
  )
}