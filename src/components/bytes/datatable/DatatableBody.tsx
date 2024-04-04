import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { DatatableBodyProps } from "./types"
import { flexRender } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatatableActions } from "./DatatableActions"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDirection } from "@radix-ui/react-direction"
import { TableRow, TableBody, TableCell } from "@/components/ui/table"

export const DatatableBody = <TData,>({ 
  table, columns, select, actions, permissions, expand
}: DatatableBodyProps<TData>) => {
  const ltr = useDirection() === "ltr"
  const rim = (expand ? 1 : 0) + (select ? 1 : 0) + ((actions && permissions) ? 1 : 0 )
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map(row => (
          <Fragment key={row.id}>
            <TableRow
              data-state={row.getIsSelected() && "selected"}
            >
              {select && (
                <TableCell>
                  <div className="flex items-center">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                    />
                  </div>
                </TableCell>
              )}
              {expand && (
                <TableCell className={ltr ? "pr-0" : "pl-0"}>
                  {ltr ? (
                    <ChevronRight 
                      className={cn(
                        "h-[1.2rem] w-[1.2rem] cursor-pointer",
                        row.getIsExpanded() ? "rotate-90" : "rotate-0"
                      )}
                      onClick={row.getToggleExpandedHandler()}
                    />
                  ) : (
                    <ChevronLeft
                      className={cn(
                        "h-[1.2rem] w-[1.2rem] cursor-pointer",
                        row.getIsExpanded() ? "-rotate-90" : "rotate-0"
                      )}
                      onClick={row.getToggleExpandedHandler()}
                    />
                  )}
                </TableCell>
              )}
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              {actions && permissions && (
                <TableCell>
                  <DatatableActions 
                    row={row} 
                    actions={actions} 
                    permissions={permissions} 
                  />
                </TableCell>
              )}
            </TableRow>
            {expand && row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length + rim}>
                  {expand(row.original)}
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))
      ) : (
        <TableRow className="h-full">
          <TableCell 
            className="h-full text-center"
            colSpan={columns.length + rim} 
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}