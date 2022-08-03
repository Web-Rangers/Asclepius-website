import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./SignIn.module.css";

import Link from "next/link";

export const SignUp = () => {
  return (
    <div className={classes.container}>
      <div className={classes.singInContainer}>
        <img
          src="headerIcon.svg"
          alt="headerIcon"
          className={classes.headerIcon}
        />
        <div className={classes.singInTextStyle}>
          <h1 className={classes.loginText}>Sign up</h1>
          <span className={classes.accountText}>
            You already have an account?
            <Link href="/SignUp">
              <a className={classes.linkedTitleStyle}> Sign in</a>
            </Link>
          </span>
        </div>
        <div className={classes.loginOptionsContainer}>
          <button type="button" className={classes.loginOptionsStyle}>
            <img src="google.svg" alt="google" className={classes.iconsStyle} />
            Google
          </button>
          <button type="button" className={classes.loginOptionsStyle}>
            <img
              src="facebook.svg"
              alt="facebook"
              className={classes.iconsStyle}
            />
            Facebook
          </button>
        </div>
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
          <div className={classes.nameSurname}>
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              type="text"
              InputProps={{
                className: classes.inputStyle,
              }}
            />
            <TextField
              id="filled-basic"
              label="Surname"
              variant="filled"
              type="text"
              InputProps={{
                className: classes.inputStyle,
              }}
            />
          </div>

          <TextField
            id="filled-basic"
            label="E-mail"
            variant="filled"
            type="text"
            InputProps={{
              className: classes.inputStyle,
            }}
          />
          <TextField
            id="filled-basic"
            label="Phone number"
            variant="filled"
            type="number"
            InputProps={{
              className: classes.inputStyle,
            }}
          />
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            type="password"
            autoComplete="current-password"
            InputProps={{
              className: classes.inputStyle,
            }}
          />
          <TextField
            id="filled-basic"
            label="Repeat password"
            variant="filled"
            type="password"
            autoComplete="current-password"
            InputProps={{
              className: classes.inputStyle,
            }}
          />
        </Box>

        <button className={classes.loginButton} type="submit">
          Login
        </button>
      </div>

      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
