import { ConfigService } from '@/core/config/config-service';
import { ApiService } from '@/core/infrastructure/api/api-service';

export interface CoreDependencies {
  configService: ConfigService;
  apiService: ApiService;
}
