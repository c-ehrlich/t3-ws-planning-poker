// src/utils/trpc.ts
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
} from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/trpc/router';
import superjson from 'superjson';
import { env } from 'env/client.mjs';

const { NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_WS_URL } = env;

function getEndingLink() {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url: `${NEXT_PUBLIC_APP_URL}/api/trpc`,
    });
  }
  const client = createWSClient({
    url: NEXT_PUBLIC_WS_URL || '',
  });
  return wsLink<AppRouter>({
    client,
  });
}

// const getBaseUrl = () => {
//   if (typeof window !== 'undefined') return ''; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        // httpBatchLink({
        //   url: `${getBaseUrl()}/api/trpc`,
        // }),
        getEndingLink(),
      ],
    };
  },
  ssr: false,
});
