import { cn } from "@/lib/utils"
import { LoadingProps } from "./types"

export const Loading = ({ className, ...props }: LoadingProps) => {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" 
      className={cn(
        "animate-spin h-5 w-5 text-black dark:text-white",
        className
      )} 
      {...props}
    >
      <circle 
        r="10" 
        cx="12" 
        cy="12" 
        strokeWidth="4"
        stroke="currentColor" 
        className="opacity-25" 
      ></circle>
      <path 
        fill="currentColor" 
        className="opacity-75" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}