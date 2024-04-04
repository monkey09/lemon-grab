import { 
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
} from "@/components/ui/dropdown-menu"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatatableVisibilityProps } from "./types"

export const DatatableVisibility = <TData,>({ table }: DatatableVisibilityProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table.getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(!!value)}
            >
              {column.columnDef.header as string}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}