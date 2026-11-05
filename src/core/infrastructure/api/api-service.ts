import { ApiRequestOptions } from '@/core/infrastructure/api/types';

export interface ApiService {
  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'data' | 'formData'>): Promise<T>;
  post<T>(endpoint: string, options?: ApiRequestOptions): Promise<T>;
  put<T>(endpoint: string, options?: ApiRequestOptions): Promise<T>;
  patch<T>(endpoint: string, options?: ApiRequestOptions): Promise<T>;
  delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T>;
}
