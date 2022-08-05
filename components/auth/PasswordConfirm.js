import React, { useState } from "react";
import Input from "../ui/input";
import classes from "../../styles/passRecovery.module.css";
import Button from "../ui/Button";
import Text from "../ui/Text";

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
        <h1 className={classes.checkEmailText}>Please check your E-mail</h1>
        <Text style={classes.codeText}>
          A one time code will be sent to your e-mail{" "}
        </Text>
        <Input
          id="filled-basic"
          label="Enter code"
          variant="filled"
          type="text"
          value={enterCode}
          onChange={handleChange}
          inputProps={{
            className: classes.inputStyle,
          }}
        />
        <Button type="submit" name={"Confirm"} />
      </div>
      <div className={classes.cardsContainer}>
        <img src="cards.png" alt="cards" />
      </div>
    </div>
  );
};
