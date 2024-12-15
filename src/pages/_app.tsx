import React from 'react';
import Layout from '../components/layout/layout';
import WalletProvider from '@/components/providers/walletProvider';
import '../styles/globals.css';
import { BlasterProvider } from '@/components/providers/blasterProvider';


export default function App({ Component, pageProps }: { Component: any, pageProps: { cookies: any } }) {
  return (
    <WalletProvider cookies={pageProps.cookies}>
        <BlasterProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BlasterProvider>
    </WalletProvider >
  );
}
