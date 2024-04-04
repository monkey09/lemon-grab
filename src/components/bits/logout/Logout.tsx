"use client"

import { toast } from "sonner"
import Cookies from "js-cookie"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useDirection, useFetch } from "@/hooks"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const Logout = () => {
  const { replace } = useRouter()
  const { refetch, isFetching, isError, error } = useFetch({
    enabled: false,
    keys: ['logout'],
    url: 'admin/admin/v1/logout'
  })

  const logout = () => {
    Cookies.remove("token")
    replace("/")
    toast.success("تم سجيل الخروج بنجاح")
  }
  
  useEffect(() => {isError && toast.error(error)}, [isError])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          loading={isFetching}
          onClick={async () => {
            const res = await refetch()
            res.isSuccess && logout()
          }}
        >
          <LogOut 
            className={cn(
              "h-[1.2rem] w-[1.2rem]",
              useDirection() === "rtl" ? "rotate-180" : ""
            )} 
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        تسجيل خروج
      </TooltipContent>
    </Tooltip>
  )
}