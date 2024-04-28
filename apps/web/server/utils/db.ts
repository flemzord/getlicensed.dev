import { queryClient } from '@getlicensed/db';
import * as schema from '@getlicensed/db';

export const tables = schema;

export function useDB() {
  return queryClient;
}

export * from '@getlicensed/db';
