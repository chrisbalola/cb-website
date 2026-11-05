/**
 * Shared validation constants and functions.
 * Used across features (profile setup, edit profile, signup, etc.).
 *
 * Validators accept a `t` function bound to the 'shared.validation' namespace
 * (i.e. `useTranslations('shared.validation')`).
 */

export const DISPLAY_NAME_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 50,
  /** Allows letters (any script), combining marks, digits, spaces, and . ' - */
  PATTERN: /^[\p{L}\p{M}0-9 .'-]{3,50}$/u,
} as const;

export const USERNAME_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  /** Only ASCII letters, digits, and underscores */
  PATTERN: /^[a-zA-Z0-9_]{3,20}$/,
  /** Username must not start with a digit */
  STARTS_WITH_NUMBER: /^\d/,
} as const;

export const LINK_VALIDATION = {
  /** Basic URL pattern requiring http(s):// protocol */
  PATTERN: /^(https?:\/\/)[\w-]+(\.\w[\w-]+)([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
} as const;

/**
 * Validates a display name.
 * Returns a translated error message or undefined if valid.
 */
export function validateDisplayName(value: string, t: (key: string) => string): string | undefined {
  if (!value || value.length === 0) return undefined;
  if (value.length < DISPLAY_NAME_VALIDATION.MIN_LENGTH) return t('displayNameTooShort');
  if (value.length > DISPLAY_NAME_VALIDATION.MAX_LENGTH) return t('displayNameTooLong');
  if (!DISPLAY_NAME_VALIDATION.PATTERN.test(value)) return t('displayNameInvalid');
  return undefined;
}

/**
 * Validates a username.
 * Returns a translated error message or undefined if valid.
 */
export function validateUsername(value: string, t: (key: string) => string): string | undefined {
  if (!value || value.length === 0) return undefined;
  if (value.length < USERNAME_VALIDATION.MIN_LENGTH) return t('usernameTooShort');
  if (value.length > USERNAME_VALIDATION.MAX_LENGTH) return t('usernameTooLong');
  if (USERNAME_VALIDATION.STARTS_WITH_NUMBER.test(value)) return t('usernameStartsWithNumber');
  if (!USERNAME_VALIDATION.PATTERN.test(value)) return t('usernameInvalid');
  return undefined;
}

/**
 * Validates a URL link.
 * Returns true if the link is valid or empty.
 */
export function validateLink(value: string): boolean {
  if (!value.trim()) return true;
  return LINK_VALIDATION.PATTERN.test(value);
}
