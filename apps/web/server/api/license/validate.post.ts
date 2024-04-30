import { schema } from '@getlicensed/db';
import { eq } from 'drizzle-orm';
import { zh } from 'h3-zod';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const body = await zh.useSafeValidatedBody(
    event,
    z.object({
      license: z.string(),
    }),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No license provided',
    });
  }

  const getLicense = await useDB()
    .select({
      name: schema.tokens.name,
      token: schema.tokens.token,
      createdAt: schema.tokens.createdAt,
      updatedAt: schema.tokens.updatedAt,
    })
    .from(schema.tokens)
    .where(eq(schema.tokens.token, body.data.license))
    .limit(1)
    .execute();

  if (getLicense.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'License not found',
    });
  }

  return {
    data: getLicense[0],
  };
});
