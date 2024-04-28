import { queryClient } from '~/server/database/db';
import * as schema from '~/server/database/schema';

export { sql, eq, and, or } from 'drizzle-orm';

export const tables = schema;

export function useDB() {
  return queryClient;
}
