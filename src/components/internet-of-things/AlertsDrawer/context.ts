import { createContext, useContext } from 'react'
import type { SortOptions } from './sortOptions'
import type { FilterOptions } from './filterOptions'

interface SortFilterContextType {
  sortOption: SortOptions
  setSortOption: React.Dispatch<React.SetStateAction<SortOptions>>
  filterOption: FilterOptions
  setFilterOption: React.Dispatch<React.SetStateAction<FilterOptions>>
}

export const SortFilterContext = createContext<
  SortFilterContextType | undefined
>(undefined)

export const useSortFilterContext = (): SortFilterContextType => {
  const context = useContext(SortFilterContext)
  if (!context) {
    throw new Error('useSortFilterContext must be used within AlertsDrawer')
  }
  return context
}
