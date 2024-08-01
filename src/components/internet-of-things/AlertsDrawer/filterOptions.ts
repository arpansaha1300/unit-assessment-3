import { IAlert } from '~/types'

export enum FilterOptions {
  PREVIOUS_24_HOURS = 'PREVIOUS_24_HOURS',
  PREVIOUS_7_DAYS = 'PREVIOUS_7_DAYS',
  PREVIOUS_30_DAYS = 'PREVIOUS_30_DAYS',
}

export const filterOptions = [
  { id: FilterOptions.PREVIOUS_7_DAYS, title: 'Previous 7 days' },
  { id: FilterOptions.PREVIOUS_24_HOURS, title: 'Previous 24 hours' },
  { id: FilterOptions.PREVIOUS_30_DAYS, title: 'Previous 30 days (all)' },
]

export const filters = {
  [FilterOptions.PREVIOUS_24_HOURS]: (x: IAlert, startDate: Date) =>
    startDate < new Date(x.date),
  [FilterOptions.PREVIOUS_7_DAYS]: (x: IAlert, startDate: Date) =>
    startDate < new Date(x.date),
  [FilterOptions.PREVIOUS_30_DAYS]: (x: IAlert, startDate: Date) =>
    startDate < new Date(x.date),
}
