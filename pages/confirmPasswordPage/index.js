import Head from "next/head";
import { PasswordConfirm } from "../../components/contents/PasswordConfirm";

function ConfirmPasswordPage() {
  return (
    <div>
      <Head>
        <title>Confrim password</title>
      </Head>
      <PasswordConfirm />
    </div>
  );
}

export default ConfirmPasswordPage;
