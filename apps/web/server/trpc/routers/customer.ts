import { schema } from '@getlicensed/db';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';

const AddShape = z.object({
  name: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const customerRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB()
      .select()
      .from(schema.customer)
      .where(eq(schema.customer.userId, ctx.userId))
      .orderBy(desc(schema.customer.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB()
      .insert(schema.customer)
      .values({
        name: input.name,
        userId: ctx.userId,
      })
      .returning();
  }),
  delete: protectedProcedure.input(DeleteShape).mutation(({ input, ctx }) => {
    return useDB()
      .delete(schema.customer)
      .where(
        and(
          eq(schema.customer.id, input.id),
          eq(schema.customer.userId, ctx.userId),
        ),
      )
      .returning();
  }),
});
