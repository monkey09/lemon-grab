import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select"
import { useDirection } from "@/hooks"
import { Loading } from "@/components/bits"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatatablePaginationProps } from "./types"

export const DatatablePagination = <TData,>({ table, loading }: DatatablePaginationProps<TData>) => {
  const ltr = useDirection() === "ltr"

  return (
    <div className="flex justify-between py-3">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={value => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount().toLocaleString()}
      </div>
      <div className="flex items-center justify-center w-[20px]">
        {loading && <Loading />}
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-medium">Go to page</p>
        <Input
          type="number"
          max={table.getPageCount()}
          min={1}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            page < table.getPageCount() && table.setPageIndex(page)
          }}
          className="border p-1 rounded w-16 h-8 text-center"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {ltr ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {ltr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {ltr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {ltr ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
