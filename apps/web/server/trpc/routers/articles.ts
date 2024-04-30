import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';
import { useDB } from '~/server/utils/db';

const AddShape = z.object({
  name: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const articlesRouter = t.router({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await useDB().article.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  add: protectedProcedure.input(AddShape).mutation(async ({ input, ctx }) => {
    return await useDB().article.create({
      data: {
        name: input.name,
        userId: ctx.userId,
      },
    });
  }),
  delete: protectedProcedure
    .input(DeleteShape)
    .mutation(async ({ input, ctx }) => {
      return await useDB().article.delete({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });
    }),
});
