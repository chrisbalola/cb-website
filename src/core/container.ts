import { AwilixContainer, asClass, Lifetime } from 'awilix';
import { ConfigService } from './config/config-service';
import { AxiosApiService } from '@/core/infrastructure/api/axios-api-service';

export function registerCoreModule(container: AwilixContainer) {
  container.register({
    // Configuration
    configService: asClass(ConfigService, { lifetime: Lifetime.SINGLETON }),

    // Infrastructure services
    apiService: asClass(AxiosApiService, { lifetime: Lifetime.SINGLETON }),
  });
}
