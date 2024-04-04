import { Scroll } from "lucide-react"
import { LangToggle, Logout, ModeToggle } from "@/components/bits"
import { CartToggle, PushInit, PushToggle } from "@/components/bytes"

export const Navbar = () => {
  return (
    <nav className="h-full flex items-center justify-between px-3">
      <Scroll className="w-10 h-10 stroke-[1.2]" />
      <div className="flex items-center gap-x-5 h-full">
        <PushInit />
        <PushToggle />
        <ModeToggle />
        <LangToggle />
        <CartToggle />
        <Logout />
      </div>
    </nav>
  )
}