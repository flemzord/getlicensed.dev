import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';
import { generateLicenseKey } from '~/server/utils/license';

const AddShape = z.object({
  name: z.string(),
  article_id: z.string(),
  customer_id: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const licensesRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB().license.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB().license.create({
      data: {
        name: input.name,
        token: generateLicenseKey,
        user: {
          connect: {
            id: ctx.userId,
          },
        },
        article: {
          connect: {
            id: input.article_id,
          },
        },
        customer: {
          connect: {
            id: input.customer_id,
          },
        },
      },
    });
  }),
  delete: protectedProcedure.input(DeleteShape).mutation(({ input, ctx }) => {
    return useDB().license.delete({
      where: {
        id: input.id,
        userId: ctx.userId,
      },
    });
  }),
});
