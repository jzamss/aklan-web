import React, { useState } from "react";
import {
  Panel,
  Checkbox,
  ActionBar,
  BackLink,
  Button,
  MsgBox,
  Spacer,
  Subtitle
} from "rsi-react-web-components";

const Disclaimer = ({
  partner,
  service,
  location,
  history,
  moveNextStep,
  movePrevStep,
}) => {
  const [agree, setAgree] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = () => {
    if (!agree) {
      setShowMessage(true);
    } else {
      moveNextStep();
    }
  }

  return (
    <Panel>
      <MsgBox
        open={showMessage}
        msg="Kindly click on the check box to agree on the terms and conditions"
        onAccept={() => setShowMessage(false) }
      />
      <Panel center>
        <Spacer />
        <Panel style={styles.container}>
          <p style={styles.text}>
            Please read before proceeding. The following
            section will require you to provide names of
            guests and other information that will require consent.
          </p>
          <p style={styles.text}>
            This information will be used for this transaction and
            for tourism purposes. In compliance with RA 10173 or Data
            Privacy Act of the Philippines, your data will not be
            used for other purposes except for the above mentioned.
          </p>
          <p style={styles.text}>
            By using, you agree to our terms and conditions.
          </p>
          <Spacer height={30} />
          <Panel style={{padding: "0px 30px"}}>
            <Checkbox
              caption="I have read and agree with the terms and conditions"
              value={agree}
              onChange={setAgree}
            />
          </Panel>
        </Panel>
      </Panel>
      <ActionBar>
        <BackLink action={() => history.goBack()}/>
        <Button caption="Next" action={onSubmit} />
      </ActionBar>
    </Panel>
  )
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

export default Disclaimer;
