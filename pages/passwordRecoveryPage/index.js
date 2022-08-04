import Head from "next/head";
import { PasswordRecovery } from "../../components/contents/passwordRecovery";

function PasswordRecoveryPage() {
  return (
    <div>
      <Head>
        <title>Password recovery Page</title>
      </Head>
      <PasswordRecovery />
    </div>
  );
}

export default PasswordRecoveryPage;
