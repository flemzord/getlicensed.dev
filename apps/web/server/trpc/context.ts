import { schema } from '@getlicensed/db';
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { inferAsyncReturnType } from '@trpc/server';
import { eq } from 'drizzle-orm';
import type { H3Event } from 'h3';

export type Context = inferAsyncReturnType<typeof createContext>;

export async function createContext(event: H3Event) {
  const session = await requireUserSession(event);
  const user = await useDB()
    .select()
    .from(schema.users)
    // @ts-ignore
    .where(eq(schema.users.githubId, session.user.id))
    .limit(1);

  return {
    session,
    user,
  };
}
