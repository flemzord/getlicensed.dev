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

export const productRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB()
      .select()
      .from(schema.product)
      .where(eq(schema.product.userId, ctx.userId))
      .orderBy(desc(schema.product.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB()
      .insert(schema.product)
      .values({
        name: input.name,
        userId: ctx.userId,
      })
      .returning();
  }),
  delete: protectedProcedure.input(DeleteShape).mutation(({ input, ctx }) => {
    return useDB()
      .delete(schema.product)
      .where(
        and(
          eq(schema.product.id, input.id),
          eq(schema.product.userId, ctx.userId),
        ),
      )
      .returning();
  }),
});
