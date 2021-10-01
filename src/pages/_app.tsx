import { ThemeProvider } from '@xstyled/styled-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { GlobalStyles, theme } from '../styles';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>Baby Matrix</title>
        <meta
          name="description"
          content="Educational tool for pre-schools to learn math by creating matrix"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
