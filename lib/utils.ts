import { format, parseISO } from 'date-fns'

export function formatDate(date: string | Date): string {
  const dateObject = typeof date === 'string' ? parseISO(date) : date
  return format(dateObject, 'd MMMM, yyyy')
}