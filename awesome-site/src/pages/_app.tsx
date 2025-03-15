import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter, Roboto_Mono } from 'next/font/google';

// 字体配置
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${robotoMono.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
} 