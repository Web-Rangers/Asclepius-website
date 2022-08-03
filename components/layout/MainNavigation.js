import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { SignUp } from "../contents/SignUp";
import { SignIn } from "../contents/SignIn";

function MainNavigation() {
  return (
    <Link href="/SignUp">
      <SignUp />
    </Link>
  );
}

export default MainNavigation;
