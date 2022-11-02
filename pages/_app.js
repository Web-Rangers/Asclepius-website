import { useState } from 'react';
import '../styles/globals.css';
import Footer from '../components/contents/Footer';
import SignUpHeader from '../components/contents/SignUpHeader';
import Header from '../components/contents/Header';
import SignUpFooter from '../components/contents/SignUpFooter';
import classes from '../styles/headerFooter.module.css';
import { useRouter } from 'next/router';

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
		<div className={{ backgroundColor: 'lightblue' }}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehidratedState}>
					{hideHeader ? signUp ? <SignUpHeader /> : <Header /> : null}
					{getLayout(<Component {...pageProps} />)}
					{hideHeader ? signUp ? <SignUpFooter /> : <Footer /> : null}
				</Hydrate>
			</QueryClientProvider>
		</div>
	);
}

export default MyApp;
