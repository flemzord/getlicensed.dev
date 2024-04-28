// @ts-ignore
import { config } from 'dotenv';
config({ path: '.env' });
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL must be set in .env file');
}

export const queryClient = neon(DATABASE_URL);
