import { tokensRouter } from '~/server/trpc/routers/tokens';
import { router, t } from '~/server/trpc/trpc';

export const appRouter = router({
  tokens: tokensRouter,
});

export type AppRouter = typeof appRouter;
