import { useState } from 'react';
import '../styles/globals.css';
import Footer from '../components/contents/Footer';
import SignUpHeader from '../components/contents/SignUpHeader';
import Header from '../components/contents/Header';
import SignUpFooter from '../components/contents/SignUpFooter';
import classes from '../styles/headerFooter.module.css';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60000,
		},
	},
});

function MyApp({ Component, pageProps }) {
	const [signUp, setSignUp] = useState(false);
	const router = useRouter();

	const hideHeader =
		router.pathname === '/signInPage' ||
		router.pathname === '/signUpPage' ||
		router.pathname === '/passwordRecoveryPage' ||
		router.pathname === '/createNewPass' ||
		router.pathname === '/confirmPasswordPage'
			? false
			: true;

	// return (
	// 	<div className={classes.body}>
	// 		{hideHeader ? signUp ? <SignUpHeader /> : <Header /> : null}
	// 		<Component {...pageProps} />
	// 		{hideHeader ? signUp ? <SignUpFooter /> : <Footer /> : null}
	// 	</div>
	// );

	const getLayout = Component.getLayout || ((page) => page);

	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehidratedState}>
					{hideHeader ? signUp ? <SignUpHeader /> : <Header /> : null}
					<Head>
						<link rel="icon" type="image/png" href={'/med.png'} />
						<meta name="robots" content="noindex" />
					</Head>
					{getLayout(<Component {...pageProps} />)}
					<Script
						id='my-script'
						strategy='afterInteractive'
						dangerouslySetInnerHTML={{
							__html: `(function(d, w, s) {
								var widgetHash = 'UwPgnPMNck3Zi0wl06Xw', bch = d.createElement(s); bch.type = 'text/javascript'; bch.async = true;
								bch.src = '//widgets.binotel.com/chat/widgets/' + widgetHash + '.js';
								var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(bch, sn);
							})(document, window, 'script');`,
						}}
					/>
					{hideHeader ? signUp ? <SignUpFooter /> : <Footer /> : null}
				</Hydrate>
			</QueryClientProvider>
		</div>
	);
}

export default MyApp;
