import { faker } from '@faker-js/faker';
import { queryClient } from '../index';
import { customer } from '../schema';

export const createCustomer = async (userId: string) => {
  const db = queryClient;
  const data: (typeof customer.$inferInsert)[] = [];

  data.push({
    name: faker.internet.userName(),
    userId: userId,
  });

  return db.insert(customer).values(data).returning();
};
