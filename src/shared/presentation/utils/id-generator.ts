/**
 * Centralized ID generation utilities
 *
 * Provides consistent ID generation across the application.
 * All ID generation uses random UUIDs to ensure uniqueness.
 *
 * Important: To avoid hydration mismatches, ensure IDs are only generated
 * on the client side (e.g., in useEffect or user interactions), not during
 * module initialization or SSR.
 */

/**
 * Generates a random UUID
 *
 * @example
 * const id = generateId(); // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Generates a scoped ID with a random UUID component
 *
 * @param scope - Namespace or entity type
 *
 * @example
 * const id = generateScopedId("poll-option"); // "poll-option-550e8400-e29b-41d4-a716-446655440000"
 */
export function generateScopedId(scope: string): string {
  return `${scope}-${generateId()}`;
}
