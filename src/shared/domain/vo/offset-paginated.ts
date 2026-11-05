export interface OffsetPaginated<T> {
  data: T[];
  offset?: number;
  total?: number;
}
