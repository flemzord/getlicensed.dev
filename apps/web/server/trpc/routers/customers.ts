import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';

const AddShape = z.object({
  name: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const customersRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB().customer.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB().customer.create({
      data: {
        name: input.name,
        userId: ctx.userId as string,
      },
    });
  }),
  delete: protectedProcedure.input(DeleteShape).mutation(({ input, ctx }) => {
    return useDB().customer.delete({
      where: {
        id: input.id,
        userId: ctx.userId,
      },
    });
  }),
});
