import { ThemeProvider } from 'components/providers/themeProvider';
import { Instrument_Serif, Inter, Newsreader } from 'next/font/google';
import { Header } from './header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-newsreader',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <Header />
      {children}
    </ThemeProvider>
  );
}
