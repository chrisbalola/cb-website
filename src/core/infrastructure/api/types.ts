import { AxiosRequestConfig } from 'axios';

export type ApiRequestOptions = {
  query?: Record<string, unknown>;
  data?: Record<string, unknown>;
  formData?: FormData;
  endpointPrefix?: string;
  baseUrl?: string;
} & Omit<AxiosRequestConfig, 'method' | 'url' | 'params' | 'data'>;

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
};

export enum ApiRequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
