import { faker } from '@faker-js/faker';
import { queryClient } from '../index';
import { product } from '../schema';

export const createProduct = async (userId: string) => {
  const db = queryClient;
  const data: (typeof product.$inferInsert)[] = [];

  data.push({
    name: faker.internet.userName(),
    userId: userId,
  });

  return db.insert(product).values(data).returning();
};
