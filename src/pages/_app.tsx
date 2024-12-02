import React from 'react';
import Layout from '../components/layout/layout';
import WalletProvider from '@/components/providers/walletProvider';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/providers/themeProvider';


export default function App({ Component, pageProps }: { Component: any, pageProps: { cookies: any } }) {
  return (
    <WalletProvider cookies={pageProps.cookies}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </WalletProvider >
  );
}
