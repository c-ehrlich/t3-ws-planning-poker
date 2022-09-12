// src/server/router/index.ts
import { t } from '../trpc';

import { exampleRouter } from './example';

export const appRouter = t.router({
  healthcheck: t.procedure.query(() => 'ok'),

  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
