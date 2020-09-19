import React, { useState, useRef } from "react";
import {
  Avatar,
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
  guest: initialGuest = {isfilipino: false, gender: "MALE"},
  guestNumber,
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

  const lastnameRef = useRef();

  const submitHandler = () => {
    const errors = {};
    required(errors, "lastname");
    required(errors, "firstname");
    required(errors, "age");
    required(errors, "gender");
    if (guest.isfilipino) {
      required(errors, "citymuni");
    } else {
      required(errors, "country");
      required(errors, "passport");
    }
    if (Object.keys(errors).length === 0) {
      onSubmit(guest);
      setGuest({});
      lastnameRef.current.focus();
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
        <div style={{paddingRight: 20}}>
          <Avatar style={styles.avatar}>{guestNumber}</Avatar>
        </div>
        <Panel style={styles.guestInfoConatainer}>
          <Text name="lastname" caption="Last Name" autoFocus={true} error={errors.lastname} helperText={errors.lastname} inputRef={lastnameRef} />
          <Text name="firstname" caption="First Name" error={errors.firstname} helperText={errors.firstname} />
          <Integer name="age" caption="Age" error={errors.age} helperText={errors.age} />
          <Combobox items={genders} name="gender" caption="Gender" error={errors.gender} helperText={errors.gender}  />
          <Spacer />
          <Checkbox name="isfilipino" caption="Is Filipino?"/>
          {guest.isfilipino  &&
            <Combobox items={lgus} name="citymuni" caption="City/Municipality" error={errors.citymuni} helperText={errors.citymuni} />
          }
          {!guest.isfilipino && (
            <React.Fragment>
              <Combobox items={countries} name="country" caption="Country of Origin" error={errors.country} helperText={errors.country}/>
              <Text name="passport" caption="Passport No." error={errors.passport} helperText={errors.passport} />
            </React.Fragment>
          )}
        </Panel>
      </FormPanel>
      <ActionBar>
        <BackLink caption={mode === "add" ? "View List" : "Cancel"} action={onCancel} />
        <Button caption={mode === "add" ? "Add" : "Update"} action={submitHandler} />
      </ActionBar>
    </Panel>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    padding: "20px 20px",
    paddingBottom: 20,
    border: "1px solid #aaa",
    borderRadius: 5,
  },
  guestInfoConatainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  avatar: {
    color: "white",
    backgroundColor: "orange",
    width: 25,
    height: 25,
  },
}

export default Guest;
