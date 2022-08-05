import Head from "next/head";
import { SignIn } from "../../components/auth/SignIn";

function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign in Page</title>
      </Head>
      <SignIn />
    </>
  );
}

export default SignInPage;
