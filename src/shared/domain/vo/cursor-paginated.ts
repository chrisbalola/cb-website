export interface CursorPaginated<T> {
  data: T[];
  nextCursor?: string;
  total?: number;
}
