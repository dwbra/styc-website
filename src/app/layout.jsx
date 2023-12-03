import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/app/components/_Footer';
import MyProvider from './components/_MyProvider';

const inter = Inter({ subsets: ['latin'] });

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
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8692686668487136"
          crossorigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content="ca-pub-8692686668487136"></meta>
      </Head>
      <body className={inter.className}>
        <MyProvider>{children}</MyProvider>
        <Footer />
      </body>
    </html>
  );
}
