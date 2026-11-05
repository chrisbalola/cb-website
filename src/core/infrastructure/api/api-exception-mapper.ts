import { AppException } from '@/shared/domain/errors/app-exception';
import { AppExceptionCodeEnum } from '@/shared/domain/errors/app-exception-code-enum';

export class ApiExceptionMapper {
  private static readonly ERROR_MAPPINGS: Record<string, AppExceptionCodeEnum> = {
    missing_access_token: AppExceptionCodeEnum.unauthorized,
    invalid_token: AppExceptionCodeEnum.unauthorized,
    token_expired: AppExceptionCodeEnum.tokenExpired,
  };

  private static toAppExceptionCode(backendError: string): AppExceptionCodeEnum {
    return this.ERROR_MAPPINGS[backendError] || AppExceptionCodeEnum.unknown;
  }

  // Optional: directly create the exception
  static toAppException(apiExceptionMessage: string, statusCode?: number): AppException {
    const code = this.toAppExceptionCode(apiExceptionMessage);
    return AppException.fromCodeAndMessage(code, apiExceptionMessage, statusCode);
  }
}
