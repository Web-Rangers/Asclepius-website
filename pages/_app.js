import { useState } from "react";
import "../styles/globals.css";
import Footer from "../components/contents/Footer";
import SignUpHeader from "../components/contents/SignUpHeader";
import Header from "../components/contents/header";

function MyApp({ Component, pageProps }) {
  const [signUp, setSignUp] = useState(true);

  return (
    <>
      {signUp ? <SignUpHeader /> : <Header />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
