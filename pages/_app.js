import "../styles/globals.css";
import Footer from "../components/contents/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
