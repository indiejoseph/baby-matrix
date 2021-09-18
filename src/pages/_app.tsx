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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap"
          rel="stylesheet"
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
