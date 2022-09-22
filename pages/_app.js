import { useState } from 'react';
import '../styles/globals.css';
import Footer from '../components/contents/Footer';
import SignUpHeader from '../components/contents/SignUpHeader';
import Header from '../components/contents/Header';
import SignUpFooter from '../components/contents/SignUpFooter';
import classes from '../styles/headerFooter.module.css';

function MyApp({ Component, pageProps }) {
	const [signUp, setSignUp] = useState(false);

	return (
		<div className={classes.body}>
			{signUp ? <SignUpHeader /> : <Header />}
			<Component {...pageProps} />
			{signUp ? <SignUpFooter /> : <Footer />}
		</div>
	);
}

export default MyApp;
