import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import BaseScreenWrapper from '../components/BaseScreenWrapper';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Arkeus</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      { /*<link rel="manifest" href="/site.webmanifest" />*/ }
      <link rel="icon" href="/favicon.ico" />
      <link href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    
    {/* Provider - Wellet connection */}
    <ThirdwebProvider desiredChainId={ ChainId.Goerli }>
      
      {/* Main Website */}
      <BaseScreenWrapper>
        {/* Page */}
        <Component {...pageProps} />
      </BaseScreenWrapper>

    </ThirdwebProvider>
  </>
);

export default App