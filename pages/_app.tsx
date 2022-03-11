import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";
import { MordalPortal, ToastPortal } from "@components/templates/portal";
import useToast from "@core/hook/use-toast";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  const { message } = useToast();

  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
      }}
    >
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <Global styles={global} />
          <Header />
          <Component {...pageProps} />
          <Footer />
          <div>{message}</div>
        </SessionProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
