// @ts-ignore
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { migrate as migrateHttp } from 'drizzle-orm/neon-http/migrator';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { migrate as migrateNode } from 'drizzle-orm/node-postgres/migrator';
// @ts-ignore
import pg from 'pg';

export * from './types';
import * as schema from './schema';
export { schema };
export * from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL must be set in .env file');
}

export const queryClient =
  process.env.ENVIRONMENT === 'local'
    ? drizzleNode(new pg.Pool({ connectionString: DATABASE_URL }), { schema })
    : drizzleHttp(neon(DATABASE_URL), { schema });

export async function dbMigrate() {
  if (process.env.ENVIRONMENT === 'local')
    // @ts-ignore
    await migrateNode(queryClient, {
      migrationsFolder: 'src/migrations',
    });
  // @ts-ignore
  else
    await migrateHttp(queryClient, {
      migrationsFolder: 'src/migrations',
    });
}

export const runMigrate = async () => {
  console.log('Running database migrations...');

  await dbMigrate()
    .then(() => {
      console.log('Database migrations done');
    })
    .catch((err) => {
      console.error('Database migrations failed', err);
    });
};
