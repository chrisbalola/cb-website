type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private isDevelopment = process.env.ENVIRONMENT === 'development';
  private minLevel: LogLevel = this.isDevelopment ? 'info' : 'error';

  private readonly levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(private context?: string) {}

  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] >= this.levels[this.minLevel];
  }
  /**
   * Formats the log message with a timestamp, level, and optional context.
   * @param level - The log level (debug, info, warn, error).
   * @param message - The log message.
   * @param context - Optional context object to include additional information.
   * @returns Formatted log message string.
   */
  private formatMessage(level: LogLevel, message: string, context?: object): string {
    const timestamp = new Date().toISOString();
    const contextString = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${this.context ? `[${this.context}] ` : ''}${message}${contextString}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private sendToRemote(level: LogLevel, message: string, context?: object) {
    // Send to monitoring service in production
    if (!this.isDevelopment && level === 'error') {
      // Hook for remote error reporting
    }
  }

  debug(message: string, context?: object) {
    if (!this.shouldLog('debug')) return;

    const formatted = this.formatMessage('debug', message, context);
    console.log(formatted);
  }

  info(message: string, context?: object) {
    if (!this.shouldLog('info')) return;

    const formatted = this.formatMessage('info', message, context);
    console.info(formatted);
    this.sendToRemote('info', message, context);
  }

  warn(message: string, context?: object) {
    if (!this.shouldLog('warn')) return;

    const formatted = this.formatMessage('warn', message, context);
    console.warn(formatted);
    this.sendToRemote('warn', message, context);
  }

  error(message: string, context?: object, error?: Error) {
    if (!this.shouldLog('error')) return;

    const formatted = this.formatMessage('error', message, { ...context, error: error?.stack });
    console.error(formatted);
    this.sendToRemote('error', message, { ...context, error });
  }

  // Convenience method for API calls
  api(method: string, url: string, status?: number, context?: object) {
    const level = status && status >= 400 ? 'error' : 'info';
    this[level](`API ${method} ${url}`, { ...context, status });
  }
}
