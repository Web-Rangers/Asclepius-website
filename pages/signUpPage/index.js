import Head from "next/head";
import { SignUp } from "../../components/auth/SignUp";

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign up Page</title>
      </Head>
      <SignUp />
    </>
  );
}

export default SignUpPage;
