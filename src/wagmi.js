import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Alfajores } from "@celo/rainbowkit-celo/chains";

const { chains, provider } = configureChains(
  [Alfajores],
  //publicProvider(),
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: "https://alfajores-forno.celo-testnet.org" }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Piggie on Celo ❤️",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains };
