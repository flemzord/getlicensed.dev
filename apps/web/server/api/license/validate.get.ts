import { schema } from '@getlicensed/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.license === undefined) {
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
    .where(eq(schema.tokens.token, query.license as string))
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
