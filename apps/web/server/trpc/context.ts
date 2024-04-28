/* eslint-disable @typescript-eslint/no-unused-vars */
import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';

export type Context = inferAsyncReturnType<typeof createContext>;

export async function createContext(event: H3Event) {
  const session = await requireUserSession(event);
  const user = await useDB()
    .select()
    .from(tables.users)
    // @ts-ignore
    .where(eq(tables.users.githubId, session.user.id))
    .limit(1);

  return {
    session,
    user,
  };
}
