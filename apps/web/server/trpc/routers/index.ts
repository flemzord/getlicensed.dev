import { articlesRouter } from '~/server/trpc/routers/articles';
import { customersRouter } from '~/server/trpc/routers/customers';
import { licensesRouter } from '~/server/trpc/routers/licenses';
import { router, t } from '~/server/trpc/trpc';

export const appRouter = router({
  licenses: licensesRouter,
  articles: articlesRouter,
  customers: customersRouter,
});

export type AppRouter = typeof appRouter;
