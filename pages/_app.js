import { useState } from "react";
import "../styles/globals.css";
import Footer from "../components/contents/Footer";
import SignUpHeader from "../components/contents/SignUpHeader";
import Header from "../components/contents/Header";
import SignUpFooter from "../components/contents/SignUpFooter";

function MyApp({ Component, pageProps }) {
  const [signUp, setSignUp] = useState(true);

  return (
    <>
      {signUp ? <SignUpHeader /> : <Header />}
      <Component {...pageProps} />
      {signUp ? <SignUpFooter /> : <Footer />}
    </>
  );
}

export default MyApp;
