import { subDays } from 'date-fns'
import { FilterOptions } from './filterOptions'
import { IAlert } from '~/store/features/alerts/alertsApiSlice'

export function getBadgeType(severity: IAlert['severity']) {
  if (severity === 'HIGH') return 'RED'
  if (severity === 'MEDIUM') return 'ORANGE'
  return 'YELLOW'
}

export function getStartDate(unit: FilterOptions) {
  const today = new Date()

  if (unit === FilterOptions.PREVIOUS_24_HOURS) {
    return subDays(today, 1)
  }

  if (unit === FilterOptions.PREVIOUS_7_DAYS) {
    return subDays(today, 7)
  }

  return subDays(today, 30)
}
