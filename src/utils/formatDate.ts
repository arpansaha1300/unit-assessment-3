import { format } from 'date-fns'

export default function formatDate(
  dateString: string,
  pattern = 'MMM dd, hh:mm a'
) {
  const date = new Date(dateString)
  return format(date, pattern)
}
