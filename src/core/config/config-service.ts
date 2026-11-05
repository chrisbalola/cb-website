import { Logger } from '@/core/utils/logger';
import { AppEnvironment } from '@/shared/domain/enums/app-environment';

export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  // Environment
  readonly environment: AppEnvironment;
  readonly isLocal: boolean;
  readonly isDevelopment: boolean;
  readonly isStaging: boolean;
  readonly isProduction: boolean;
  readonly isTest: boolean;

  // API Configuration (available for future use)
  readonly apiBaseUrl: string;
  readonly apiTimeout: number;

  // Site
  readonly siteUrl: URL;

  constructor() {
    // Environment
    this.environment = this.getEnvironment();
    this.isLocal = this.environment === 'local';
    this.isDevelopment = this.environment === 'development';
    this.isStaging = this.environment === 'staging';
    this.isProduction = this.environment === 'production';
    this.isTest = this.environment === 'test';

    // API
    this.apiBaseUrl = this.get('API_BASE_URL', 'http://localhost:3000/api');
    this.apiTimeout = this.getInt('API_TIMEOUT', 30000);

    // Site
    this.siteUrl = new URL(this.get('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'));

    // Log configuration in development
    if (this.isDevelopment) {
      this.logger.debug('Loaded configuration:', {
        environment: this.environment,
      });
    }
  }

  // Helper: Get environment
  private getEnvironment(): AppEnvironment {
    const environment = process.env.ENVIRONMENT as AppEnvironment;

    if (!Object.values(AppEnvironment).includes(environment)) {
      console.warn(`Invalid environment: ${environment}, defaulting to development`);
      return AppEnvironment.development;
    }

    return environment;
  }

  // Helper: Get string value
  private get(key: string, defaultValue: string = ''): string {
    const value = process.env[key];

    if (value === undefined || value === '') {
      return defaultValue;
    }

    return value;
  }

  // Helper: Get boolean value
  private getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = process.env[key];

    if (value === undefined || value === '') {
      return defaultValue;
    }

    return value === 'true' || value === '1';
  }

  // Helper: Get number (int) value
  private getInt(key: string, defaultValue: number = 0): number {
    const value = process.env[key];

    if (value === undefined || value === '') {
      return defaultValue;
    }

    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      console.warn(`Environment variable ${key} is not a valid number, using default: ${defaultValue}`);
      return defaultValue;
    }

    return parsed;
  }
}
