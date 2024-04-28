import type { Config } from 'drizzle-kit';

export default {
  verbose: true,
  schema: './src/schema.ts',
  out: './src/migrations',
} satisfies Config;
