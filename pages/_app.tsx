import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Global styles={global} />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
