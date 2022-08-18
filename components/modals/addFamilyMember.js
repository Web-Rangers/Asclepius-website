import { useEffect, useState } from "react";
import styles from "../../styles/components/modals/addFamilyMember.module.css";
import classNames from "classnames";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/DatePicker";

export default function AddFamilyMember({ onClose, children }) {
  const [age, setAge] = useState("");
  const [under18, setUnder18] = useState(false);

  useEffect(() => {
    console.log(age);
  }, [age]);

  return (
    <>
      <div className={styles.familyMemberModal} onClick={() => onClose()}></div>
      <div className={styles.container}>
        <div className={styles.fmTool}>
          <h2>Add Family Member</h2>
          <img src="/closeFilter.svg" onClick={() => onClose()} alt="" />
        </div>
        <div className={classNames(styles.memberContainer)}>
          <div className={styles.memberSelectors}>
            <Select
              label="Age"
              labelStyle="outside"
              className={styles.servInput}
              value={age}
              options={[
                {
                  label: "Above 18",
                  value: "1",
                },
                { label: "Under 18", value: "2" },
              ]}
              onChange={(value) => {
                setAge(value);
                if (value == "1") {
                  setUnder18(false);
                }
              }}
            />
            {under18 ? (
              <>
                <Input label="Name" className={styles.servInput} />
                <Input label="Surname" className={styles.servInput} />
                <DatePicker
                  mode="single"
                  label="Date birth"
                  className={styles.servInput}
                />
                <Input label="Id number" className={styles.servInput} />
                <Input label="Email" className={styles.servInput} />
                <Input label="Phone number" className={styles.servInput} />
                <Select
                  label="Gender"
                  labelStyle="outside"
                  className={styles.servInput}
                  value={age}
                  options={[
                    {
                      label: "Man",
                      value: "1",
                    },
                    { label: "Woman", value: "2" },
                  ]}
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
                <Input label="City" className={styles.servInput} />
                <Input
                  label="Registration address"
                  className={styles.servInput}
                />
              </>
            ) : (
              <>
                {age == "1" && (
                  <>
                    <Input label="Name" className={styles.servInput} />
                    <Input label="Surname" className={styles.servInput} />
                    <Input label="Email" className={styles.servInput} />
                  </>
                )}
              </>
            )}
          </div>
          {under18 ? (
            <div className={styles.filterBtns}>
              <Button name="Clear" style={styles.clearBtn} />
              <Button name="add" style={styles.filterBtn} />
            </div>
          ) : (
            <div className={styles.filterBtns}>
              <Button name="Clear" style={styles.clearBtn} />
              {age == "2" ? (
                <Button
                  name="Next"
                  style={styles.filterBtn}
                  onClick={() => setUnder18(true)}
                />
              ) : (
                <Button name="Next" style={styles.filterBtn} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
