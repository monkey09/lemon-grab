import { 
  DropdownMenu, 
  DropdownMenuItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { DatatableActionsProps } from "./types"
import { Button } from "@/components/ui/button"

export const DatatableActions = <TData,>({ 
  actions, row, permissions
}: DatatableActionsProps<TData>) => {
  const handledActions = actions.filter(action => permissions[action.id])
  return handledActions.length > 0 && (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rtl">
        {handledActions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => action.fn(row.original)}
          >
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}