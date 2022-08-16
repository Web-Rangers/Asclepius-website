import React, { useState } from "react";
import classes from "../../styles/signIn.module.css";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Text from "../../components/ui/Text";

export const ContactUs = () => {
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
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.singInContainer}>
          <div className={classes.singInTextStyle}>
            <h1 className={classes.loginText}>Contact us</h1>
            <Text style={classes.accountText}>
              Our friendly team would love to hear from you!
            </Text>
          </div>
          <div className={classes.nameSurnameContainer}>
            <div>
              <Text style={classes.contactUsNameText}>First name</Text>
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
            </div>
            <div>
              <Text style={classes.contactUsNameText}>Last name</Text>
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
          </div>

          <Text style={classes.contactUsInputText}>E-mail</Text>
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
          <Text style={classes.contactUsInputText}>Phone number</Text>
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
          <Text style={classes.contactUsInputText}>Message</Text>
          <Input
            id="filled-basic"
            label="Message"
            variant="filled"
            autoComplete="current-password"
            type="text"
            value={values.repeatPassword}
            onChange={handleChange("repeatPassword")}
            inputProps={{
              className: classes.inputStyle,
            }}
          />
          <Button type="submit" name="Send message" />
        </div>
        <div className={classes.cardsContainer}>
          <img src="contactUs.png" alt="cards" width="500" height="600" />
          <div className={classes.contactInfo}>
            <img src="messages.svg" alt="messages" />
            <Text style={classes.contactInfoText}>Medicalgroup@gmail.com</Text>
            <img src="location.svg" alt="location" />
            <Text style={classes.contactInfoText}>
              Tbilisi , Ana Antonovskaya str. 9
            </Text>
            <img src="phone.svg" alt="phone" />
            <Text style={classes.contactInfoText}>+9955575755576</Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
