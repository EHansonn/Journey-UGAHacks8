import type { AppProps } from 'next/app';
import '@/styles/global_preload.css';
import 'antd/dist/antd.css';
import '@/styles/global_postload.css';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
