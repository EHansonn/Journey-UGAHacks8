import type { AppProps } from 'next/app';
import '@/styles/global_preload.css';
import 'antd/dist/reset.css';
import '@/styles/global_postload.css';
import Layout from '../../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
