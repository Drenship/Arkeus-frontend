import Head from 'next/head';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import '../styles/globals.css'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Arkeus</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      { /*<link rel="manifest" href="/site.webmanifest" />*/ }
      <link rel="icon" href="/favicon.ico" />
      <link href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    
    {/* Mainnet */}
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  </>
);

export default App