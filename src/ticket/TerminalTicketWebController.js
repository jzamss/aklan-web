import React, { useState } from "react";
import {
  Page,
  Panel,
  Stepper,
  Card,
  Title,
  StateProvider,
  useData,
 } from "rsi-react-web-components";
 import "rsi-react-web-components/dist/index.css";
 import reducer, {initialState} from "./reducer";

import Disclaimer from "./Disclaimer";
import ContactVerification from "./ContactVerification";
import TravelItinerary from "./TravelItinerary";
import GuestsInformation from "./GuestsInformation";
import OrderFeePayment from "./OrderFeePayment";

const pages = [
  {step: 1, name: "disclaimer", caption: "Disclaimer", Component: Disclaimer},
  {step: 2, name: "verification", caption: "Verification", Component: ContactVerification},
  {step: 3, name: "itinerary", caption: "Travel Itinerary", Component: TravelItinerary},
  {step: 4, name: "guests", caption: "Guests Information", Component: GuestsInformation},
  {step: 5, name: "epayment", caption: "Payment", Component: OrderFeePayment},
]

const TerminalTicketWebController = ({
  partner,
  service,
  location,
  history
}) => {
  const [step, setStep] = useState(2);
  const [completedStep, setCompletedStep] = useState(-1);
  const [guestsInfo, setGuestsInfo] = useState({mode: "add", guests: []});

  const moveNextStep = () => {
    setStep(cs => cs+1);
  }

  const movePrevStep = () => {
    setStep(cs => cs-1);
  }

  const page = pages[step];
  const PageComponent = page.Component;
  const compProps = {
    partner,
    service,
    location,
    history,
    moveNextStep,
    movePrevStep,
    setGuestsInfo,
    stepCompleted: step < completedStep
  };

  const handleStep = (step) => {
    setStep(step);
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {page.name === "epayment" ? (
        <PageComponent {...compProps} />
      ) : (
        <Page>
          <Panel target="left" style={styles.stepperContainer} >
            <Stepper steps={pages} completedStep={completedStep} activeStep={step} handleStep={handleStep} />
          </Panel>
          <Card>
            <Title>Boracay Terminal Fee Ticket Order</Title>
            <PageComponent page={page} {...compProps} />
          </Card>
          {page.name === "guests" && guestsInfo.mode  === "add" &&
            <Panel target="right" style={styles.stepperContainer} >
              <h4>List of Guests</h4>
              {guestsInfo.guests.map((guest, idx) => <p key={idx}>{`${idx+1}. ${guest.firstname} ${guest.lastname}`}</p>)}
            </Panel>
          }
        </Page>
      )}
    </StateProvider>
  )
};

const styles = {
  stepperContainer: {
    paddingTop: 30,
    paddingLeft: 40,
  }
}

export default TerminalTicketWebController;
