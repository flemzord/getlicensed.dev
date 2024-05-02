import { schema } from '@getlicensed/db';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, t } from '~/server/trpc/trpc';
import { generateLicenseKey } from '~/server/utils/license';

const AddShape = z.object({
  name: z.string(),
  customerId: z.string().uuid(),
  productId: z.string().uuid(),
  expirationDate: z.string(),
});

const DeleteShape = z.object({
  id: z.string(),
});

export const licenseRouter = t.router({
  all: protectedProcedure.query(({ ctx }) => {
    return useDB()
      .select()
      .from(schema.license)
      .innerJoin(
        schema.customer,
        eq(schema.license.customerId, schema.customer.id),
      )
      .innerJoin(
        schema.product,
        eq(schema.license.productId, schema.product.id),
      )
      .where(eq(schema.license.userId, ctx.userId))
      .orderBy(desc(schema.license.createdAt));
  }),
  add: protectedProcedure.input(AddShape).mutation(({ input, ctx }) => {
    return useDB()
      .insert(schema.license)
      .values({
        name: input.name,
        userId: ctx.userId,
        customerId: input.customerId,
        productId: input.productId,
        token: generateLicenseKey,
        expiresAt: new Date(input.expirationDate),
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
