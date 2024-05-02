import { customerRouter } from '~/server/trpc/routers/customer';
import { licenseRouter } from '~/server/trpc/routers/license';
import { productRouter } from '~/server/trpc/routers/product';
import { router, t } from '~/server/trpc/trpc';

export const appRouter = router({
  license: licenseRouter,
  product: productRouter,
  customer: customerRouter,
});

export type AppRouter = typeof appRouter;
