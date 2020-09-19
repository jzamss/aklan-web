import React, { useState } from "react";
import {
  Panel,
  Checkbox,
  ActionBar,
  BackLink,
  Button,
  MsgBox,
  Spacer,
  useData
} from "rsi-react-web-components";
import { EmailVerification } from "rsi-react-filipizen-components";

const ContactVerification = ({
  partner,
  service,
  location,
  history,
  moveNextStep,
  movePrevStep,
}) => {
  const [ctx, dispatch] = useData();
  const [agree, setAgree] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = () => {
    if (!agree) {
      setShowMessage(true);
    } else {
      moveNextStep();
    }
  }

  const onVerifyEmail = (contact) => {
    dispatch({type: "SET_CONTACT", contact});
    moveNextStep();
  }

  return <EmailVerification onVerify={onVerifyEmail} onCancel={movePrevStep} partner={partner} />
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 350,
    padding: 15,
    border: "1px solid #aaa",
    borderRadius: 5,
    borderShadow: "5px 0px 7px -7px rgba(0,0,0,0.8)"
  },
  text: {
    textAlign: "center",
    opacity: 0.75,
    marginTop: 0,
  }
};

export default ContactVerification;
