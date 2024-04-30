import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon(
  new Pool({ connectionString: process.env.DATABASE_URL }),
);

// @ts-ignore
export const prisma =
  process.env.ENVIRONMENT === 'local'
    ? new PrismaClient()
    : new PrismaClient({ adapter });
export * from '@prisma/client';
