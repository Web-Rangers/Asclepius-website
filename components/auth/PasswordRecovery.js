import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../ui/Input";
import classes from "../../styles/passRecovery.module.css";
import Button from "../ui/Button";

export const PasswordRecovery = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/createNewPass");
    console.log("ddd");
  };
  return (
    <div className={classes.container}>
      <div className={classes.singInContainer}>
        <img
          src="headerIcon.svg"
          alt="headerIcon"
          className={classes.headerIcon}
        />
        <h1 className={classes.passwordRecoveryText}>Password recovery</h1>
        <Input
          id="filled-basic"
          label="E-mail"
          variant="filled"
          type="email"
          value={email}
          onChange={handleChange}
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <Button type="submit" onClick={handleClick} name="Login" />
        <div>
          <Link href="/signInPage">
            <a className={classes.returnTextStyle}> Return back</a>
          </Link>
        </div>
      </div>
      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
