import { format, parseISO } from 'date-fns'

export function formatDate(date: string | Date): string {
  const dateObject = typeof date === 'string' ? parseISO(date) : date
  return format(dateObject, 'd MMMM, yyyy')
}

export const truncatedText = (text : string, maxLength : number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}