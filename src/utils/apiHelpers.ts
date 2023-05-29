/**
 * Typed helper to remove null/undefined from an array, in a way that will correctly update the array's type
 */
export function isNotNullOrUndefined<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}