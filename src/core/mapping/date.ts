export function parseDateOrNull(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function dateToISOStringOrNull(value: Date | null | undefined): string | null {
  if (!value) return null;
  return isNaN(value.getTime()) ? null : value.toISOString();
}

/**
 * Parse date from DD/MM/YYYY format to Date object
 * @param dateString - Date string in DD/MM/YYYY format
 * @returns Date object
 */
export function parseDateFromDDMMYYYY(dateString: string): Date {
  const [day, month, year] = dateString.split('/');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
