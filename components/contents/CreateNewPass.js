import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from "../../styles/passRecovery.module.css";
import { useRouter } from "next/router";

export const CreateNewPass = () => {
  const router = useRouter();
  const [values, setValues] = useState({
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

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/confirmPasswordPage");
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
          <TextField
            id="1"
            label="Enter new password"
            variant="filled"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
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
            id="2"
            label="Repeat password"
            variant="filled"
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
        <button
          className={classes.loginButton}
          type="submit"
          onClick={handleClick}
        >
          Send
        </button>
        <div>
          <Link href="/passwordRecoveryPage">
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
