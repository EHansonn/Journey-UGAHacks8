import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/global_preload.css';
import 'antd/dist/reset.css';
import '@/styles/global_postload.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}
