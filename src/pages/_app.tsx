import React from 'react';
import Layout from '../components/layout/layout';
import WalletProvider from '@/components/providers/walletProvider';
import '../styles/globals.css';


export default function App({ Component, pageProps }: { Component: any, pageProps: { cookies: any } }) {
  return (
    <WalletProvider cookies={pageProps.cookies}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}
