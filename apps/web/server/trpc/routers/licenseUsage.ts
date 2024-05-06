import { schema } from '@getlicensed/db';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';
import { generateLicenseKey } from '~/server/utils/license';

const GetByIdShape = z.object({
  id: z.string(),
});

export const licenseUsageRouter = t.router({
  getById: protectedProcedure.input(GetByIdShape).query(({ input, ctx }) => {
    return useDB().execute(sql`SELECT time_bucket('5 minutes', created_at) AS time, count(action), action
FROM "License_usage"
WHERE license_id = ${input.id} AND type = 'LICENSE_VALIDATE'
GROUP BY time,action
ORDER BY time DESC LIMIT 10;`);
  }),
});
