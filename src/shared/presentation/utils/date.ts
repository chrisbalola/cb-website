import { format, isToday, isYesterday } from 'date-fns';

/**
 * Formats a date as a separator label for message lists.
 * Returns "Today", "Yesterday", or a formatted date string.
 *
 * @param date - The date to format
 * @param t - Translation function from next-intl
 * @returns Formatted date string
 *
 * @example
 * ```tsx
 * const t = useTranslations('common');
 * formatDateSeparator(new Date(), t); // "Today"
 * formatDateSeparator(yesterday, t); // "Yesterday"
 * formatDateSeparator(oldDate, t); // "January 15, 2024"
 * ```
 */
export function formatDateSeparator(date: Date, t: (key: string) => string): string {
  if (isToday(date)) return t('date.today');
  if (isYesterday(date)) return t('date.yesterday');
  return format(date, 'MMMM d, yyyy');
}
