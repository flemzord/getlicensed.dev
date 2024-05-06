import { faker } from '@faker-js/faker';
import { queryClient } from '../index';
import { licenseUsage } from '../schema';

export const createLicenseUsage = async (licenseId: string) => {
  const db = queryClient;
  const data: (typeof licenseUsage.$inferInsert)[] = [];

  for (let i = 0; i < 1000; i++) {
    const token = 'license_' + faker.string.uuid();
    data.push({
      createdAt: faker.date.between(faker.date.past(1), faker.date.future(1)),
      licenseId: licenseId,
      type: 'LICENSE_VALIDATE',
      action: 'SUCCESS',
    });
  }
  for (let i = 0; i < 1000; i++) {
    const token = 'license_' + faker.string.uuid();
    data.push({
      createdAt: faker.date.between(faker.date.past(1), faker.date.future(1)),
      licenseId: licenseId,
      type: 'LICENSE_VALIDATE',
      action: 'EXPIRED',
    });
  }

  return db.insert(licenseUsage).values(data).returning();
};
