import { AppExceptionCodeEnum } from './app-exception-code-enum';

export class AppException extends Error {
  constructor(
    public readonly code: AppExceptionCodeEnum,
    public readonly details?: {
      message?: string;
      stackTrace?: string;
      statusCode?: number;
    }
  ) {
    super(code); // Pass code as message to Error
    this.name = 'AppException';
    this.message = (details?.message as string) || code;
  }

  get isUnknown(): boolean {
    return this.code === AppExceptionCodeEnum.unknown;
  }

  get isNotFound(): boolean {
    return this.details?.statusCode === 404;
  }

  get isUnauthorized(): boolean {
    return this.details?.statusCode === 401 || this.code === AppExceptionCodeEnum.unauthorized;
  }

  static unknown(message?: string, statusCode?: number): AppException {
    return new AppException(AppExceptionCodeEnum.unknown, { message, statusCode });
  }

  static fromMessage(message: string, statusCode?: number): AppException {
    const code = Object.values(AppExceptionCodeEnum).includes(message as AppExceptionCodeEnum)
      ? (message as AppExceptionCodeEnum)
      : AppExceptionCodeEnum.unknown;
    return new AppException(code, { message, statusCode });
  }

  static fromCodeAndMessage(code: AppExceptionCodeEnum, message?: string, statusCode?: number): AppException {
    return new AppException(code, { message, statusCode });
  }

  /**
   * Reconstructs an AppException from a serialized error (e.g., from server actions).
   * Use this on the client side to recover the full AppException from errors thrown in server actions.
   */
  static fromError(error: unknown): AppException {
    if (error instanceof AppException) {
      return error;
    }

    if (error instanceof Error) {
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.code) {
          return new AppException(parsed.code, {
            message: parsed.message,
            statusCode: parsed.statusCode,
          });
        }
      } catch {
        // Not a JSON message, treat as unknown error
      }
      return AppException.fromMessage(error.message);
    }

    return new AppException(AppExceptionCodeEnum.unknown);
  }

  /**
   * Converts this AppException to a plain Error with JSON-encoded data in the message.
   * Use this when throwing errors that need to cross the server/client boundary.
   */
  toSerializableError(): Error {
    return new Error(
      JSON.stringify({
        code: this.code,
        message: this.details?.message,
        statusCode: this.details?.statusCode,
      })
    );
  }
}
