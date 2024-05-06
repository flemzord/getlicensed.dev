import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';
import { queryClient } from '../index';
import { user } from '../schema';

export const createUser = async () => {
  const db = queryClient;
  const data: (typeof user.$inferInsert)[] = [];

  data.push({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    githubId: '1952914',
  });
  return db.insert(user).values(data).returning();
};
