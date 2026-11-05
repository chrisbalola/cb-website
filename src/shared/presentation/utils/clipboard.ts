/**
 * Attempts to copy text to clipboard using modern API with legacy fallback
 *
 * @param text - The text to copy to clipboard
 * @returns Promise resolving to true if copy succeeded, false otherwise
 *
 * @example
 * ```typescript
 * const success = await copyToClipboard('https://example.com/profile/user123');
 * if (success) {
 *   // Show success message
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Modern clipboard API failed, falling back to legacy method:', error);
      // Fall through to legacy method
    }
  }

  // Fallback to legacy execCommand method
  return fallbackCopyToClipboard(text);
}

/**
 * Legacy clipboard copy using document.execCommand
 * Used as fallback for older browsers or when clipboard API fails
 *
 * @param text - The text to copy
 * @returns true if copy succeeded, false otherwise
 */
function fallbackCopyToClipboard(text: string): boolean {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Make the textarea invisible and prevent scrolling
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error('Fallback clipboard copy failed:', error);
    document.body.removeChild(textArea);
    return false;
  }
}
