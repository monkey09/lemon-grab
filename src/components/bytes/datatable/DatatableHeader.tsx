import { DatatableHeaderProps } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"
import { flexRender } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatatableFilter } from "./DatatableFilter"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const DatatableHeader = <TData,>({ 
  table, filter, select, actions, permissions, expand
}: DatatableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {select && (
            <TableHead>
              <div className="flex items-center">  
                <Checkbox
                  checked={table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")}
                  onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                  aria-label="Select all"
                />
              </div>
            </TableHead>
          )}
          {expand && <TableHead></TableHead>}
          {headerGroup.headers.map(header => (
            <TableHead key={header.id}>
              <div className="flex items-center gap-x-2">
                {filter && filter.includes(header.column.id) ? (
                  <>
                    <Button
                      variant="link"
                      className="px-0 gap-x-2"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowDown className="h-4 w-4" />,
                        desc: <ArrowUp className="h-4 w-4" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Button>
                    <DatatableFilter column={header.column} table={table} />
                  </>
                ) : (
                  <>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div className="h-8 w-36"></div>
                  </>
                )}
              </div>
            </TableHead>
          ))}
          {actions && permissions && <TableHead></TableHead>}
        </TableRow>
      ))}
    </TableHeader>
  )
}