import Head from "next/head";
import { SignUp } from "../../components/contents/SignUp";

function SignUpPage() {
  return (
    <div>
      <Head>
        <title>Sign up Page</title>
      </Head>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
