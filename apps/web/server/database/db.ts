// @ts-ignore
import { config } from 'dotenv';
config({ path: '.env' });
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { migrate as migrateHttp } from 'drizzle-orm/neon-http/migrator';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { migrate as migrateNode } from 'drizzle-orm/node-postgres/migrator';
// @ts-ignore
import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL must be set in .env file');
}

export const queryClient =
  process.env.ENVIRONMENT === 'local'
    ? drizzleNode(new pg.Pool({ connectionString: DATABASE_URL }))
    : drizzleHttp(neon(DATABASE_URL));

export async function dbMigrate() {
  if (process.env.ENVIRONMENT === 'local')
    // @ts-ignore
    await migrateNode(queryClient, {
      migrationsFolder: 'server/database/migrations',
    });
  // @ts-ignore
  else
    await migrateHttp(queryClient, {
      migrationsFolder: 'server/database/migrations',
    });
}

// console.log('DATABASE_URL', DATABASE_URL);
// console.log('ENVIRONMENT', process.env.ENVIRONMENT);
// if (process.env.ENVIRONMENT === 'local') {
//   console.log('Running in local environment');
//   neonConfig.pipelineConnect = false;
//   neonConfig.pipelineTLS = false;
//   neonConfig.useSecureWebSocket = false;
//   neonConfig.wsProxy = () => "127.0.0.1:5433";
// }
//
// export const queryClient = neon(DATABASE_URL);
