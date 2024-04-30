import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';

export type Context = inferAsyncReturnType<typeof createContext>;

export async function createContext(event: H3Event) {
  const session = await requireUserSession(event);
  const user = await useDB().user.findFirst({
    where: {
      // @ts-ignore
      githubId: session.user.id,
    },
  });

  return {
    session,
    user,
  };
}
