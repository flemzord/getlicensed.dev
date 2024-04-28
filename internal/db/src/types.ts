import type { InferSelectModel } from 'drizzle-orm';
import type * as schema from './schema';

export type Users = InferSelectModel<typeof schema.users>;
export type Tokens = InferSelectModel<typeof schema.tokens>;
