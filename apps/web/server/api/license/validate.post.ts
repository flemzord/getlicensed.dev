import { schema } from '@getlicensed/db';
import { eq } from 'drizzle-orm';
import { zh } from 'h3-zod';
import { z } from 'zod';

interface License {
  name: string;
  token: string;
  productName: string;
  customerName: string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const checkLicenseIsValid = async (license: License) => {
  if (!license.expirationDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'License has no expiration date',
    });
  }

  if (license.expirationDate <= new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'License expired',
    });
  }
  return license;
};

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

  const license: License[] = await useDB()
    .select({
      name: schema.license.name,
      token: schema.license.token,
      productName: schema.product.name,
      customerName: schema.customer.name,
      expirationDate: schema.license.expiresAt,
      createdAt: schema.license.createdAt,
      updatedAt: schema.license.updatedAt,
    })
    .from(schema.license)
    .innerJoin(
      schema.customer,
      eq(schema.license.customerId, schema.customer.id),
    )
    .innerJoin(schema.product, eq(schema.license.productId, schema.product.id))
    .where(eq(schema.license.token, body.data.license))
    .limit(1)
    .execute();

  if (license.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'License not found',
    });
  }

  await checkLicenseIsValid(license[0]);

  return {
    data: license[0],
  };
});
