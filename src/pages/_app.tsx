// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import {
  getSession,
  SessionProvider,
  signOut,
  useSession,
} from "next-auth/react";
import { trpc } from "../utils/trpc";
import React from "react";
import PPButton from "components/ui/PPButton";
import Image from "next/future/image";
import { User } from "tabler-icons-react";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <LoggedInUserWrapper>
        <Component {...pageProps} />
      </LoggedInUserWrapper>
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

function LoggedInUserWrapper(props: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session?.user) return <>props.children</>;

  return (
    <div className="min-h-screen w-screen">
      <div className="flex items-center justify-between bg-stone-300 p-2">
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s avatar`}
              width={64}
              height={64}
            />
          ) : (
            <User />
          )}
          <div>Welcome, {session.user.name}</div>
        </div>
        <PPButton size="sm" color="dark" onClick={() => signOut()}>
          Logout
        </PPButton>
      </div>
      {props.children}
    </div>
  );
}
