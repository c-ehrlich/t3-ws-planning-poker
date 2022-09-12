// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { getSession, SessionProvider } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    pageProps: {
      session: await getSession(ctx),
    },
  };
};

export default trpc.withTRPC(MyApp);
