import "../styles/global.css";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppLayoutProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import MainLayout from "../components/common/MainLayout";
import { myDarkTheme } from "../lib/nextui";
import { queryClient } from "../lib/react-query";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) {
  const router = useRouter();

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider theme={myDarkTheme}>
          <MainLayout>
            {getLayout(<Component {...pageProps} key={router.asPath} />)}
          </MainLayout>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
