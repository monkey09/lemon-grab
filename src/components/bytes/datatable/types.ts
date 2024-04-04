import { 
  Row, 
  Table,
  Column, 
  ColumnDef, 
  SortingState, 
  RowSelectionState, 
  ColumnFiltersState, 
} from "@tanstack/react-table"
import { ReactNode } from "react"

export interface Action<TData> {
  title: string
  id: string
  fn: (item: Row<TData>["original"]) => void
}

export interface DatatableProps<TData> {
  cols: ColumnDef<TData>[]
  url: string
  keys: string[]
  selected?: (items: (keyof RowSelectionState)[]) => void
  actions?: Action<TData>[]
  expand?: (item: Row<TData>["original"]) => ReactNode
}

export interface DatatablePaginationProps<TData> {
  table: Table<TData>
  loading: boolean
}

export interface DatatableBodyProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
  select: boolean
  actions?: Action<TData>[]
  permissions?: Record<string, boolean>
  expand?: (item: Row<TData>["original"]) => ReactNode
}

export interface DatatableFilterProps<TData> {
  column: Column<TData>
  table: Table<TData>
}

export interface DatatableHeaderProps<TData> {
  table: Table<TData>
  filter: string[] | undefined
  select: boolean
  actions?: Action<TData>[]
  permissions?: Record<string, boolean>
  expand?: (item: Row<TData>["original"]) => ReactNode
}

export interface DatatableVisibilityProps<TData> {
  table: Table<TData>
}

export interface DatatableActionsProps<TData> {
  row: Row<TData>
  actions: Action<TData>[]
  permissions: Record<string, boolean>
}

export interface Filters {
  (arg: ColumnFiltersState): Record<string, any>
}

export interface Sorters {
  (arg: SortingState): Record<string, any>
}

export interface DatatableShellProps {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
}