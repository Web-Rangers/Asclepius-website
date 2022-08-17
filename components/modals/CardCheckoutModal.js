import { useState } from "react";
import styles from "../../styles/components/modals/addFamilyMember.module.css";
import classNames from "classnames";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/DatePicker";
import Text from "../ui/Text";
import Image from "next/image";
import s from "../../styles/buyCard.module.css";

const CardCheckoutModal = (props) => {
  const [cardType, setCardType] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleChange = () => {
    setCardType(cardType);
    setGender(gender);
    setDateOfBirth(dateOfBirth);
  };

  return (
    <div className={s.cardCheckoutModalContiner}>
      <div className={s.headerContainer}>
        <Text style={s.checkoutTitleStyle}>Checkout</Text>
        <Image
          alt="closeIcon"
          src="/closeIcon.svg"
          width="30px"
          height="30px"
          onClick={props.closeModal}
        />
      </div>
      <Text style={s.documentLink}>
        Read information about the processing of personal data here -
        <a href="link" className={s.documentLinkStyle}>
          {" "}
          Document link
        </a>
      </Text>
      <Select
        label="Card type"
        labelStyle="outside"
        className={s.inputStyle}
        style={s.select}
        inputStyle={s.selectBody}
        value={cardType}
        options={[
          {
            label: "Silver",
            value: "1",
          },
          { label: "Gold", value: "2" },
          { label: "Platinium", value: "3" },
        ]}
        onChange={handleChange}
      />
      <Input
        type="text"
        label="Card validity period"
        placeholder="Card validity period"
        className={s.inputStyle}
        style={s.inputFieldStyle}
      />
      <Input
        label="Name"
        className={s.inputStyle}
        placeholder="Name"
        style={s.inputFieldStyle}
      />
      <Input
        label="Surname"
        placeholder="Surname"
        className={s.inputStyle}
        style={s.inputFieldStyle}
      />
      <DatePicker
        mode="single"
        label="Date birth"
        placeholder="Date birth"
        value={console.log(dateOfBirth)}
        // labelStyle={s.datePickerlabelStyle}
      />
      <Input
        label="Passport ID"
        placeholder="Passport ID"
        className={s.inputStyle}
        style={s.inputFieldStyle}
      />
      <Input
        label="E-mail"
        placeholder="E-mail"
        className={s.inputStyle}
        style={s.inputFieldStyle}
      />
      <Input
        label="Phone number"
        className={s.inputStyle}
        placeholder="Phone number"
        style={s.inputFieldStyle}
      />
      <Select
        label="Gender"
        labelStyle="outside"
        className={s.inputStyle}
        style={s.select}
        inputStyle={s.selectBody}
        value={gender}
        options={[
          {
            label: "Man",
            value: "1",
          },
          { label: "Woman", value: "2" },
        ]}
        onChange={handleChange}
      />

      <Input
        label="City"
        className={s.inputStyle}
        placeholder="City"
        style={s.inputFieldStyle}
      />
      <Input
        label="Registration address"
        placeholder="Registration address"
        className={s.inputStyle}
        style={s.inputFieldStyle}
      />
      <div className={s.checkoutButtonContainer}>
        <Button name="Checkout" style={s.checkoutButton} />
      </div>
    </div>
  );
};

export default CardCheckoutModal;
