import React, { useState } from "react";
import {
  FormPanel,
  Panel,
  Subtitle,
  Spacer,
  Text,
  Integer,
  Combobox,
  ActionBar,
  Button,
  BackLink,
  Checkbox
} from "rsi-react-web-components";


const genders = ["MALE", "FEMALE"];
const lgus = ["KALIBO", "CEBU"];
const countries = ["AFRICA", "CHINA", "SOUTH KOREA"];

const Guest = ({
  mode,
  guest: initialGuest = {isfilipino: false},
  onCancel,
  onSubmit,
}) => {

  const [guest, setGuest] = useState({...initialGuest});
  const [errors, setErrors] = useState({});

  const subtitle = (mode === "add" ? "New " : "Modify ") + " Guest Information";

  const required = (errors, field) => {
    if (!guest[field]) {
      errors[field] = "This field is required."
    }
  }

  const submitHandler = () => {
    const errors = {};
    required(errors, "lastname");
    required(errors, "firstname");
    required(errors, "age");
    required(errors, "gender");
    if (Object.keys(errors).length === 0) {
      onSubmit(guest);
    } else {
      setErrors(errors);
    }
  }

  return (
    <Panel>
      <Subtitle>{subtitle}</Subtitle>
      <Spacer />
      <label>Please enter guest information.</label>
      <Spacer />
      <FormPanel context={guest} handler={setGuest} style={styles.container}>
        <Text name="lastname" caption="Last Name" autoFocus={true} error={errors.lastname} helperText={errors.lastname} />
        <Text name="firstname" caption="First Name" error={errors.firstname} helperText={errors.firstname} />
        <Integer name="age" caption="Age" error={errors.age} helperText={errors.age} />
        <Combobox items={genders} name="gender" caption="Gender" error={errors.gender} helperText={errors.gender}  />
        <Spacer />
        <Checkbox name="isfilipino" caption="Is Filipino?"/>
        {guest.isfilipino  &&
          <Combobox items={lgus} name="citymuni" caption="City/Municipality" />
        }
        {!guest.isfilipino &&
          <Combobox items={countries} name="country" caption="Country of Origin" />
        }
        <Spacer />
      </FormPanel>
      <ActionBar>
        <BackLink caption="Cancel" action={onCancel} />
        <Button caption="Submit" action={submitHandler} />
      </ActionBar>
    </Panel>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px",
    paddingBottom: 20,
    border: "1px solid #aaa",
    borderRadius: 5
  },
}

export default Guest;
