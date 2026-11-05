import { ApiService } from '@/core/infrastructure/api/api-service';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { ApiRequestMethodEnum, ApiRequestOptions } from '@/core/infrastructure/api/types';
import { AppException } from '@/shared/domain/errors/app-exception';
import { AppExceptionCodeEnum } from '@/shared/domain/errors/app-exception-code-enum';
import { ConfigService } from '@/core/config/config-service';
import { ApiExceptionMapper } from '@/core/infrastructure/api/api-exception-mapper';

export class AxiosApiService implements ApiService {
  private readonly client: AxiosInstance;

  constructor({ configService }: { configService: ConfigService }) {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';

    this.client = axios.create({
      baseURL: configService.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        'platform-device-id': userAgent,
      },
    });

    this.client.interceptors.request.use(async (config) => {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access-token')?.value;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (config.headers.Authorization) {
          delete config.headers.Authorization;
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
      return config;
    });
  }

  private async request<T>(
    method: ApiRequestMethodEnum,
    endpoint: string,
    { query, data, formData, endpointPrefix, ...config }: ApiRequestOptions = {}
  ): Promise<T> {
    try {
      const prefix = endpointPrefix || '';
      const requestConfig: AxiosRequestConfig = {
        method,
        url: `${prefix}${endpoint}`,
        params: query,
        ...config,
      };

      if (formData) {
        requestConfig.data = formData;
        requestConfig.headers = {
          ...requestConfig.headers,
          'Content-Type': 'multipart/form-data',
        };
      } else if (data) {
        requestConfig.data = data;
      }

      const response = await this.client(requestConfig);
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data;

        if (responseData === undefined || responseData === null) {
          // Changing from [AppExceptionCodeEnum.noResponseData] to
          // [AppExceptionCodeEnum.networkError] as noResponseData implies that there's
          // an issue accessing the api. Because it would've returned a response with data
          // if it was accessible.
          throw new AppException(AppExceptionCodeEnum.networkError).toSerializableError();
        }

        const statusCode = axiosError.response?.status;

        if (typeof responseData === 'object' && (responseData as { message?: string }).message) {
          throw ApiExceptionMapper.toAppException((responseData as { message: string }).message, statusCode).toSerializableError();
        }

        throw AppException.fromMessage(JSON.stringify(responseData), statusCode).toSerializableError();
      }

      throw error;
    }
  }

  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'data' | 'formData'>) {
    return this.request<T>(ApiRequestMethodEnum.GET, endpoint, {
      ...options,
    });
  }

  post<T>(endpoint: string, options?: ApiRequestOptions) {
    return this.request<T>(ApiRequestMethodEnum.POST, endpoint, options);
  }

  put<T>(endpoint: string, options?: ApiRequestOptions) {
    return this.request<T>(ApiRequestMethodEnum.PUT, endpoint, options);
  }

  patch<T>(endpoint: string, options?: ApiRequestOptions) {
    return this.request<T>(ApiRequestMethodEnum.PATCH, endpoint, options);
  }

  delete<T>(endpoint: string, options?: ApiRequestOptions) {
    return this.request<T>(ApiRequestMethodEnum.DELETE, endpoint, options);
  }
}
