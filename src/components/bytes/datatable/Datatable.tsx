"use client"

import { 
  SortingState,
  useReactTable, 
  getCoreRowModel, 
  VisibilityState, 
  PaginationState, 
  ColumnFiltersState,
  getExpandedRowModel,
} from "@tanstack/react-table"
import { useFetch } from "@/hooks"
import { DatatableProps } from "./types"
import { filters, sorters } from "./utils"
import { useEffect, useState } from "react"
import { Table } from "@/components/ui/table"
import { DatatableBody } from "./DatatableBody"
import { DatatableShell } from "./DatatableShell"
import { DatatableHeader } from "./DatatableHeader"
import { keepPreviousData } from "@tanstack/react-query"
import { DatatablePagination } from "./DatatablePagination"
import { DatatableVisibility } from "./DatatableVisibility"

export const Datatable = <TData extends {id: number}>({ 
  url, cols, selected, actions, keys, expand
}: DatatableProps<TData>) => {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0,pageSize: 10})

  useEffect(() => {selected && selected(Object.keys(rowSelection))}, [rowSelection])
  
  const dataQuery = useFetch<TData[]>({
    url: url,
    placeholderData: keepPreviousData,
    keys: [...keys, pagination, sorting, columnFilters],
    params: {...filters(columnFilters), ...sorters(sorting),
    page: pagination.pageIndex + 1, per_page: pagination.pageSize}
  })

  const table = useReactTable({
    columns: cols,
    manualSorting: true,
    manualPagination: true,
    enableRowSelection: true,
    onSortingChange: setSorting,
    rowCount: dataQuery.data?.total,
    getRowCanExpand: () => !!expand,
    data: dataQuery.data?.data ?? [],
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id.toString(),
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {pagination, rowSelection, columnFilters, 
    sorting, columnVisibility},
    onColumnFiltersChange: e => {
      setPagination(prev => ({...prev, pageIndex: 0}))
      return setColumnFilters(e)
    },
  })

  return (
    <DatatableShell
      header={<DatatableVisibility table={table} />}
      footer={<DatatablePagination table={table} loading={dataQuery.isFetching} />}
    >
      <Table>
        <DatatableHeader 
          table={table} 
          expand={expand}
          actions={actions}
          select={!!selected} 
          filter={dataQuery.data?.filter} 
          permissions={dataQuery.data?.actions}
        />
        <DatatableBody 
          table={table} 
          columns={cols} 
          expand={expand}
          actions={actions}
          select={!!selected} 
          permissions={dataQuery.data?.actions}
        />
      </Table>
    </DatatableShell>
  )
}