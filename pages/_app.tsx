import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";
import { MordalPortal, ToastPortal } from "@components/templates/portal";
import useToast from "@core/hook/use-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const { message } = useToast();
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Global styles={global} />
        <Component {...pageProps} />
        <div>{message}</div>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
