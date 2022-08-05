import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from "../../styles/SignIn.module.css";

import Link from "next/link";

export const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(prop);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowRepeatPassword = () => {
    setValues({
      ...values,
      showRepeatPassword: !values.showRepeatPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            <Link href="/signInPage">
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
        <div className={classes.lineContainer}>
          <span className={classes.line}></span>
          <span className={classes.lineTextStyle}>or</span>
          <span className={classes.line}></span>
        </div>

        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 3,
              width: 360,
              display: "flex",
              backgroundColor: "#FFFFFF",
              // "&:hover": {
              //   border: "1px solid #3A74D2",
              //   backgroundColor: "#FFFFFF",
              // },
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
          <div className={classes.lineContainer}>
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              InputProps={{
                className: classes.nameSurnameContainer,
              }}
            />
            <TextField
              id="filled-basic"
              label="Surname"
              variant="filled"
              type="text"
              value={values.surname}
              onChange={handleChange("surname")}
              InputProps={{
                className: classes.nameSurnameContainer,
              }}
            />
          </div>
          <TextField
            id="filled-basic"
            label="E-mail"
            variant="filled"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            InputProps={{
              className: classes.inputStyle,
            }}
          />
          <TextField
            id="filled-basic"
            label="Phone number"
            variant="filled"
            type="text"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            InputProps={{
              className: classes.inputStyle,
            }}
          />
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            autoComplete="current-password"
            InputProps={{
              className: classes.inputStyle,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="filled-basic"
            label="Repeat password"
            variant="filled"
            autoComplete="current-password"
            type={values.showRepeatPassword ? "text" : "password"}
            value={values.repeatPassword}
            onChange={handleChange("repeatPassword")}
            InputProps={{
              className: classes.inputStyle,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showRepeatPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
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
