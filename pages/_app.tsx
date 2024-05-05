import "@/styles/globals.css";
import "@/styles/support.css";
import type { AppProps } from "next/app";
import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from "next-themes";

const openSans = Open_Sans({
  subsets: ['hebrew'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
