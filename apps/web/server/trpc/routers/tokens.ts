import { desc } from 'drizzle-orm';
import { generateRandomString } from 'ts-randomstring/lib';
import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';

const AddShape = z.object({
  name: z.string(),
});

export const tokensRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB()
      .select()
      .from(tables.tokens)
      .where(eq(tables.tokens.userId, ctx.userId))
      .orderBy(desc(tables.tokens.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB().insert(tables.tokens).values({
      name: input.name,
      userId: ctx.userId,
      token: generateRandomString(),
    });
  }),
});
