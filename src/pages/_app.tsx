import "../styles/global.css";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import MainLayout from "../components/common/MainLayout";
import { myDarkTheme } from "../lib/nextui";
import { queryClient } from "../lib/react-query";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider theme={myDarkTheme}>
          <MainLayout>
            <Component {...pageProps} key={router.asPath} />
          </MainLayout>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
