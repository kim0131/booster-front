import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";
import useToast from "@core/hook/use-toast";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";

import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
const isProduction = process.env.NODE_ENV === "production";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { message } = useToast();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Global styles={global} />
        <Header />
        <Component {...pageProps} />
        <Footer />
        <div>{message}</div>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
