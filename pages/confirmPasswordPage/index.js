import Head from "next/head";
import { PasswordConfirm } from "../../components/auth/PasswordConfirm";

function ConfirmPasswordPage() {
  return (
    <>
      <Head>
        <title>Confrim password</title>
      </Head>
      <PasswordConfirm />
    </>
  );
}

export default ConfirmPasswordPage;
