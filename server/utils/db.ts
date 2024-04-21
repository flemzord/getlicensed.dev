import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/server/database/schema";
import { hubDatabase } from "@nuxthub/core/dist/runtime/server/utils/database";

export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDB() {
  return drizzle(hubDatabase(), { schema });
}