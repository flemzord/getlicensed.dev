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

  const getLicense = await useDB().license.findFirst({
    select: {
      id: true,
      name: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      token: body.data.license,
    },
  });

  if (getLicense.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'License not found',
    });
  }

  return {
    data: getLicense,
  };
});
