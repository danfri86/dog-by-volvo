import '../src/styles/globals.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { Layout } from 'src/components';
import { StyleProvider, ThemePicker } from 'vcc-ui';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Used to dehydrate data fetched serverside
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StyleProvider>
          <ThemePicker variant="light">
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemePicker>
        </StyleProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
