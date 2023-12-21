/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';
import Footer from '@/app/components/global/_Footer';
import ResponsiveAppBar from './components/global/ResponsiveAppBar';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Spotify to Youtube Converter',
  description: 'A SPA that takes your spotify playlist and builds a new playlist in youtube with all of the songs.',
};

export const viewport = {
  viewport: 'initial-scale=1, width=device-width',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8692686668487136"
        crossorigin="anonymous"
      ></script>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kalnia:wght@100;200;300;400;500;600;700&family=Nanum+Brush+Script&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={roboto?.className}>
        <ResponsiveAppBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
