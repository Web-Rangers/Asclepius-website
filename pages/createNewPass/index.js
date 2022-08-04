import Head from "next/head";
import { CreateNewPass } from "../../components/contents/CreateNewPass";

function PasswordRecoveryPage() {
  return (
    <div>
      <Head>
        <title>Create new password</title>
      </Head>
      <CreateNewPass />
    </div>
  );
}

export default PasswordRecoveryPage;
