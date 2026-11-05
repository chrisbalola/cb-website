/**
 * Formats a numeric value to a human-readable string with K/M suffixes
 * @param value - The number to format
 * @returns Formatted string (e.g., 1000 -> "1K", 1500000 -> "1.5M")
 * @example
 * formatCount(999) // "999"
 * formatCount(1000) // "1K"
 * formatCount(1500) // "1.5K"
 * formatCount(1000000) // "1M"
 * formatCount(2500000) // "2.5M"
 * formatCount(-1500) // "-1.5K"
 * formatCount(NaN) // "0"
 * formatCount(Infinity) // "0"
 */
export function formatCount(value: number): string {
  // Handle invalid inputs
  if (!Number.isFinite(value)) {
    return '0';
  }

  // Handle negative numbers
  if (value < 0) {
    return `-${formatCount(Math.abs(value))}`;
  }

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return value.toString();
}

/**
 * Formats a number with comma separators
 * @param value - The number to format
 * @returns Formatted string with commas (e.g., 1000 -> "1,000", 1234567 -> "1,234,567")
 * @example
 * formatNumber(999) // "999"
 * formatNumber(1000) // "1,000"
 * formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}
