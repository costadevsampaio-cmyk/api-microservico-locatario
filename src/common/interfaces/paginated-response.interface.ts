import { PaginationMeta } from './pagination.interface';

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}