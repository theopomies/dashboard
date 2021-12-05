import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { ServicesProvider } from "../hooks/useServices";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServicesProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ServicesProvider>
  );
}

export default MyApp;
