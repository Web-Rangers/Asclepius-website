import * as React from "react";
import classes from "../../styles/signIn.module.css";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Text from "../ui/Text";
import Image from "next/image";

export const SignIn = () => {
  return (
    <div className={classes.container}>
      <div className={classes.singInContainer}>
        <Image
          layout="fill"
          src="headerIcon.svg"
          alt="headerIcon"
          className={classes.headerIconSignIn}
        />
        <div className={classes.singInTextStyle}>
          <h1 className={classes.loginText}>Login</h1>
          <Text style={classes.accountText}>
            Do not have an account?
            <Link href="/signUpPage">
              <a className={classes.linkedTitleStyle}> Create one</a>
            </Link>
          </Text>
        </div>
        <div className={classes.loginOptionsContainer}>
          <button type="button" className={classes.loginOptionsStyle}>
            <Image layout="fill" src="google.svg" alt="google" className={classes.iconsStyle} />
            Google
          </button>
          <button type="button" className={classes.loginOptionsStyle}>
            <Image
              layout="fill"
              src="facebook.svg"
              alt="facebook"
              className={classes.iconsStyle}
            />
            Facebook
          </button>
        </div>
        <div className={classes.lineContainer}>
          <Text style={classes.line} />
          <Text style={classes.lineTextStyle}>or</Text>
          <Text style={classes.line} />
        </div>
        <Input
          label="Name"
          type="text"
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <Input
          label="Password"
          variant="filled"
          type="password"
          autoComplete="current-password"
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <div className={classes.linkedTitle}>
          <Link href="/passwordRecoveryPage">
            <a className={classes.linkedTitleStyle}>Forget password?</a>
          </Link>
        </div>
        <Button type="submit" name="Login" />
      </div>
      <div className={classes.cardsContainer}>
        <Image src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
