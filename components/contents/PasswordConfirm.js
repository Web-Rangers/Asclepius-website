import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import classes from "../../styles/passRecovery.module.css";

export const PasswordConfirm = () => {
  const [enterCode, setEnterCode] = useState("");

  const handleChange = (event) => {
    setEnterCode(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.singInContainer}>
        <img
          src="headerIcon.svg"
          alt="headerIcon"
          className={classes.headerIcon}
        />
        <img
          src="confirm.svg"
          alt="Confirm Icon"
          // className={classes.headerIcon}
        />
        <h1 className={classes.passwordRecoveryText}>
          Please check your E-mail
        </h1>
        <span className={classes.codeText}>
          A one time code will be sent to your e-mail{" "}
        </span>
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
            label="Enter code"
            variant="filled"
            type="text"
            value={enterCode}
            onChange={handleChange}
            InputProps={{
              className: classes.inputStyle,
            }}
          />
        </Box>

        <button className={classes.loginButton} type="submit">
          Confirm
        </button>
      </div>
      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
