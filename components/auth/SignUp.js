import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from "../../styles/signIn.module.css";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Text from "../ui/Text";
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
          <Text style={classes.accountText}>
            You already have an account?
            <Link href="/signInPage">
              <a className={classes.linkedTitleStyle}> Sign in</a>
            </Link>
          </Text>
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
          <Text style={classes.line} />
          <Text style={classes.lineTextStyle}>or</Text>
          <Text style={classes.line} />
        </div>
        <div className={classes.nameSurnameContainer}>
          <Input
            id="filled-basic"
            label="Name"
            variant="filled"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            inputProps={{
              className: classes.nameSurnameStyle,
            }}
          />
          <Input
            id="filled-basic"
            label="Surname"
            variant="filled"
            type="text"
            value={values.surname}
            onChange={handleChange("surname")}
            inputProps={{
              className: classes.nameSurnameStyle,
            }}
          />
        </div>
        <Input
          id="filled-basic"
          label="E-mail"
          variant="filled"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <Input
          id="filled-basic"
          label="Phone number"
          variant="filled"
          type="text"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <Input
          id="filled-basic"
          label="Password"
          variant="filled"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          autoComplete="current-password"
          inputProps={{
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
        <Input
          id="filled-basic"
          label="Repeat password"
          variant="filled"
          autoComplete="current-password"
          type={values.showRepeatPassword ? "text" : "password"}
          value={values.repeatPassword}
          onChange={handleChange("repeatPassword")}
          inputProps={{
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
        <Button type="submit" name="Login" />
      </div>
      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
