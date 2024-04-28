import { schema } from '@getlicensed/db';
import { desc, eq } from 'drizzle-orm';
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
      .from(schema.tokens)
      .where(eq(schema.tokens.userId, ctx.userId))
      .orderBy(desc(schema.tokens.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB().insert(schema.tokens).values({
      name: input.name,
      userId: ctx.userId,
      token: generateRandomString(),
    });
  }),
});
