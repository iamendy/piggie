import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, client } from "../wagmi";
import "../styles/globals.css";
import { Inter, Slackey } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--inter",
});

function App({ Component, pageProps }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <NextHead>
          <title>Piggie</title>
        </NextHead>

        {mounted && (
          <main className={`${inter.variable}`}>
            <Toaster />
            <Component {...pageProps} />
          </main>
        )}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
