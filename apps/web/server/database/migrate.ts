import { drizzle } from 'drizzle-orm/neon-http/driver';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { queryClient } from '~/server/database/db';

export const runMigrate = async () => {
  console.log('Running database migrations...');

  const db = drizzle(queryClient);
  await migrate(db, { migrationsFolder: 'server/database/migrations' })
    .then(() => {
      console.log('Database migrations done');
    })
    .catch((err) => {
      console.error('Database migrations failed', err);
    });
};

await runMigrate();
