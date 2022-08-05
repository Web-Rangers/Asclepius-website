import Head from "next/head";
import { SignIn } from "../../components/contents/SignIn";

function SignInPage() {
  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>
      <SignIn />
    </div>
  );
}

export default SignInPage;
