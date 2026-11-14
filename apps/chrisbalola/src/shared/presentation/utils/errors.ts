export interface CaptureExceptionOptions {
  tags?: Record<string, string>;
  level?: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
  context?: Record<string, unknown>;
}

export function captureException(error: unknown, options?: CaptureExceptionOptions): void {
  if (!(error instanceof Error)) {
    return;
  }

  console.error(`[${options?.level ?? 'error'}]`, error.message, options?.tags);
}
