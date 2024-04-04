import { Filters, Sorters } from "./types"

export const filters: Filters = (columnFilters) => {
  const filters:Record<string, any> = {}
  columnFilters.length && columnFilters.forEach(item => 
    filters[`filter[${item.id}]`] = item.value) 
  return filters
}

export const sorters: Sorters = (sorting) => {
  const sorters:Record<string, any> = {}
  sorting.length && (sorters['sort'] = (sorting[0].desc 
    ? '-' : '') + sorting[0].id)
  return sorters
}