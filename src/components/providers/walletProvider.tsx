'use client'

import React, { type ReactNode } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { base } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter } from 'lib/web3/wagmiConfig'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'


// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base],
  defaultNetwork: base,
  metadata: metadata,
  themeMode: 'dark',
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false, // Optional - true by default
  },
  themeVariables: {
    '--w3m-color-mix': '#000',
    // '--w3m-color-mix-strength': 40,
    // '--w3m-accent': '#F2AD01',
    // '--w3m-font-family': 'BDOGrotesk',
    // '--w3m-border-radius-master': '3px', 

  }
})

function WalletProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default WalletProvider