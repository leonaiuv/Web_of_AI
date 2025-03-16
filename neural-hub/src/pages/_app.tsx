import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // 防止 FOUC (Flash Of Unstyled Content)
  useEffect(() => {
    document.documentElement.classList.add('js-enabled');
  }, []);

  return (
    <Component {...pageProps} />
  );
} 