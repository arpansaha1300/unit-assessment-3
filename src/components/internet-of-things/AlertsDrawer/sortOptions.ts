import { IAlert } from '~/store/features/alerts/alertsApiSlice'

export enum SortOptions {
  SEVERITY_HIGH_TO_LOW = 'SEVERITY_HIGH_TO_LOW',
  SEVERITY_LOW_TO_HIGH = 'SEVERITY_LOW_TO_HIGH',
}

export const sortOptions = [
  { id: SortOptions.SEVERITY_HIGH_TO_LOW, title: 'Severity (high → low)' },
  { id: SortOptions.SEVERITY_LOW_TO_HIGH, title: 'Severity (low → high)' },
]

export const sorters = {
  [SortOptions.SEVERITY_HIGH_TO_LOW]: (a: IAlert, b: IAlert) => {
    if (a.severity === 'HIGH') return -1
    if (b.severity === 'HIGH') return 1
    if (a.severity === 'MEDIUM') return -1
    if (b.severity === 'MEDIUM') return 1
    if (a.severity === 'LOW') return -1
    return 1
  },
  [SortOptions.SEVERITY_LOW_TO_HIGH]: (a: IAlert, b: IAlert) => {
    if (a.severity === 'HIGH') return 1
    if (b.severity === 'HIGH') return -1
    if (a.severity === 'MEDIUM') return 1
    if (b.severity === 'MEDIUM') return -1
    if (a.severity === 'LOW') return 1
    return -1
  },
}
