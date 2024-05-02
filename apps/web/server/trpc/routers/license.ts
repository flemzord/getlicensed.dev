import { schema } from '@getlicensed/db';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';
import { generateLicenseKey } from '~/server/utils/license';

const AddShape = z.object({
  name: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const licenseRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB()
      .select()
      .from(schema.license)
      .where(eq(schema.license.userId, ctx.userId))
      .orderBy(desc(schema.license.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB()
      .insert(schema.license)
      .values({
        name: input.name,
        userId: ctx.userId,
        token: generateLicenseKey,
      })
      .returning();
  }),
  delete: protectedProcedure.input(DeleteShape).mutation(({ input, ctx }) => {
    return useDB()
      .delete(schema.license)
      .where(
        and(
          eq(schema.license.id, input.id),
          eq(schema.license.userId, ctx.userId),
        ),
      )
      .returning();
  }),
});
