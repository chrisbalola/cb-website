/**
 * Converts a name string into initials (max 2 characters).
 *
 * @param name - The name to convert to initials
 * @returns The initials (uppercase, max 2 chars) or null if name is empty/null
 *
 * @example
 * getInitials('John Doe') // 'JD'
 * getInitials('Alice') // 'AL'
 * getInitials('  Bob  Smith  ') // 'BS'
 * getInitials('') // null
 * getInitials(null) // null
 */
export function getInitials(name: string | null | undefined): string | null {
  if (!name) return null;

  return name
    .split(' ')
    .filter((word) => word.trim().length > 0)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}
