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
  Checkbox,
  randomInt
} from "rsi-react-web-components";


const genders = [{objid: "M", caption: "MALE"}, {objid: "F", caption: "FEMALE"}];
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

  const firstNameRef = useRef();

  const isValidGuest = () => {
    const errors = {};
    required(errors, "lastname");
    required(errors, "firstname");
    required(errors, "age");
    required(errors, "gender");
    if (guest.isfilipino) {
      required(errors, "province");
    } else {
      required(errors, "country");
      required(errors, "passport");
    }
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  }

  const saveGuestAndAddAnother = () => {
    if (isValidGuest()) {
      onSubmit({...guest, objid: randomInt(8)});
      setGuest({});
      firstNameRef.current.focus();
    }
  }

  const saveGuestAndDone = () => {
    saveGuestAndAddAnother();
    onCancel();
  }

  const updateGuest = () => {
    if (isValidGuest()) {
      onSubmit(guest);
      onCancel();
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
          <Text name="firstname" caption="First Name" error={errors.firstname} helperText={errors.firstname} inputRef={firstNameRef} autoFocus={true} />
          <Text name="lastname" caption="Last Name" error={errors.lastname} helperText={errors.lastname} />
          <Integer name="age" caption="Age" error={errors.age} helperText={errors.age} />
          <Combobox items={genders} name="gender" expr={item => item.caption} caption="Gender" error={errors.gender} helperText={errors.gender}  />
          <Spacer />
          <Checkbox name="isfilipino" caption="Is Filipino?"/>
          {guest.isfilipino  &&
            <Combobox items={lgus} name="province" caption="City/Municipality" error={errors.province} helperText={errors.province} />
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
        { mode === "add" &&
          <React.Fragment>
            <Panel row>
              <Button caption="Save and Add Another Guest" action={saveGuestAndAddAnother} color="secondary"/>
              <Button caption="Save and Done" action={saveGuestAndDone} color="secondary"/>
            </Panel>
            <Button caption="Done" action={onCancel} />
          </React.Fragment>
        }
        { mode !== "add" &&
          <React.Fragment>
            <BackLink caption="Cancel" action={onCancel} />
            <Button caption="Update" action={updateGuest} color="secondary"/>
          </React.Fragment>
        }
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
