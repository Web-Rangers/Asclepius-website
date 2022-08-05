import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/passRecovery.module.css";

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
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 3,
              width: 360,
              display: "flex",
              backgroundColor: "rgb(255,255,255)",
              border: "1px solid #D5D8DE",
              "&:hover": {
                border: "1px solid #3A74D2",
                backgroundColor: "rgb(250,250,250)",
              },
              "& label": {
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: 1,
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="E-mail"
            variant="filled"
            type="email"
            value={email}
            onChange={handleChange}
            InputProps={{
              className: classes.inputStyle,
            }}
          />
        </Box>
        <button
          className={classes.loginButton}
          type="submit"
          onClick={handleClick}
        >
          Login
        </button>

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
