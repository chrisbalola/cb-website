export enum AppExceptionCodeEnum {
  // Generic errors
  unknown = 'unknown',
  badRequest = 'badRequest',

  // Network and request errors
  noResponseData = 'noResponseData', // No response data received from the server.
  networkError = 'networkError',
  tooManyRequests = 'tooManyRequests',

  // Permission errors
  operationNotAllowed = 'operationNotAllowed',

  // Authorization errors
  unauthorized = 'unauthorized',
  tokenExpired = 'tokenExpired',

  // Authentication errors
  invalidCredentials = 'invalidCredentials',
  invalidEmail = 'invalidEmail',
  emailAlreadyExists = 'emailAlreadyExists',
  emailNotVerified = 'emailNotVerified',
  weakPassword = 'weakPassword',

  // User-related errors
  userNotFound = 'userNotFound',
  userDisabled = 'userDisabled',

  // OAuth errors
  operationCancelled = 'operationCancelled',
  popupBlocked = 'popupBlocked',
  accountExistsWithDifferentCredential = 'accountExistsWithDifferentCredential',
  credentialAlreadyInUse = 'credentialAlreadyInUse',

  // API errors
  userNotRegistered = 'user_not_registered',

  // Media errors
  mediaSizeExceeded = 'mediaSizeExceeded',
  mediaInvalidFormat = 'mediaInvalidFormat',
  mediaUploadTimeout = 'mediaUploadTimeout',
  mediaNetworkError = 'mediaNetworkError',
  mediaUploadFailed = 'mediaUploadFailed',
  mediaNotFound = 'mediaNotFound',
  mediaDeleteFailed = 'mediaDeleteFailed',
}
