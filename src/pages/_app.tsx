import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/global_preload.css';
import 'antd/dist/reset.css';
import '@/styles/global_postload.css';
import Layout from '../../components/Layout';
import { LoadScript, useJsApiLoader } from '@react-google-maps/api';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			{/* <LoadScript libraries= googleMapsApiKey="AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU"> */}
			<Layout>
				<Component {...pageProps} />
			</Layout>
			{/* </LoadScript> */}
		</SessionProvider>
	);
}
