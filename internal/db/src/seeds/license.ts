import { faker } from '@faker-js/faker';
import { queryClient } from '../index';
import { license } from '../schema';

export const createLicense = async (
  userId: string,
  productId: string,
  customerId: string,
) => {
  const db = queryClient;
  const data: (typeof license.$inferInsert)[] = [];

  const token = 'license_' + faker.string.uuid();
  data.push({
    name: faker.internet.userName(),
    userId: userId,
    productId: productId,
    customerId: customerId,
    token: token,
    expiresAt: faker.date.future(),
  });

  return db.insert(license).values(data).returning();
};
