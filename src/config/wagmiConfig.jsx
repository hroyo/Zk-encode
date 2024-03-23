import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { sepolia } from "viem/chains";
import { walletConnectProvider } from '@web3modal/wagmi'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { infuraProvider } from 'wagmi/providers/infura'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'




// import MetaMaskIcon from "../assets/MetaMask_Fox 3.png"

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
    walletConnectProvider({ projectId }),
    publicProvider()
  ]
);
const metadata = {
  name: 'ZkEncode',
  description: 'ZkEncode',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    // new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    // new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
  ],
  publicClient
})

// Create web3modal configuration
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableOnramp: true, // Optional - false as default
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#0a0a0a',
    '--w3m-color-mix-strength': 10,
    '--w3m-font-family': 'montserrat',
    '--w3m-accent': '',
    '--w3m-border-radius-master': '5px',
  },

  // Custom Configurations for Web3Modal
  defaultChain: sepolia,
  // chainImages: {
  //   1: 'https://my.images.com/eth.png'
  // },
  // connectorImages: {
  // coinbaseWallet: 'https://images.mydapp.com/coinbase.png',
  // metamask: 'https://images.mydapp.com/metamask.png'
  //   metamask: MetaMaskIcon,
  //   injected: MetaMaskIcon,
  // },
  tokens: {
    //   1: {
    //     address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    //   },
    11155111: {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
    }
  },
  // customWallets: [
  //   {
  //     id: 'myCustomWallet',
  //     name: 'My Custom Wallet',
  //     homepage: 'www.mycustomwallet.com', // Optional
  //     image_url: 'my_custom_wallet_image', // Optional
  //     mobile_link: 'mobile_link', // Optional - Deeplink or universal
  //     desktop_link: 'desktop_link', // Optional - Deeplink
  //     webapp_link: 'webapp_link', // Optional
  //     app_store: 'app_store', // Optional
  //     play_store: 'play_store' // Optional
  //   }
  // ],
  // termsConditionsUrl: 'https://www.mytermsandconditions.com',
  // privacyPolicyUrl: 'https://www.myprivacypolicy.com',
})

export default function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}