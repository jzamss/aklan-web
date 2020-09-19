import React, { useState } from "react";
import store from "store";
import {
  Page,
  Panel,
  Stepper,
  Card,
  Title,
  StateProvider,
  dateAdd,
 } from "rsi-react-web-components";

import { EPayment } from "rsi-react-filipizen-components";
import Disclaimer from "./Disclaimer";
import ContactVerification from "./ContactVerification";
import TravelItinerary from "./TravelItinerary";
import GuestsInformation from "./GuestsInformation";
import OrderFeePayment from "./OrderFeePayment";
// import OrderFee from "./OrderFee";

const pages = [
  {step: 1, name: "disclaimer", caption: "Disclaimer", Component: Disclaimer},
  {step: 2, name: "verification", caption: "Verification", Component: ContactVerification},
  {step: 3, name: "itinerary", caption: "Travel Itinerary", Component: TravelItinerary},
  {step: 4, name: "guests", caption: "Guests Information", Component: GuestsInformation},
  // {step: 5, name: "orderfees", caption: "Order Fees", Component: OrderFee},
  {step: 5, name: "epayment", caption: "Payment", Component: OrderFeePayment},
]


const initialState = {
  contact: {},
  entity: {
    routes: [
      {objid: "R1", from: "caticlan", to: "cagban", title: "Caticlan - Cagban", },
      {objid: "R2", from: "cagban", to: "caticlan", title: "Cagban - Caticlan", },
    ],
    guests: [
      {objid: "G1", lastname: "SANTOS", firstname: "PETER", age: 25, isfilipino: true, citymuni: "CEBU", country: "PHILIPPINES", gender: "MALE"},
      {objid: "G2", lastname: "SANTOS", firstname: "SHARON", age: 23, isfilipino: true, citymuni: "CEBU", country: "PHILIPPINES", gender: "FEMALE"},
    ]
  },
}

const getStoredEntity = (contact) => {
  return store.get(contact.email);
}

const saveEntityToLocal = (draft) => {
  //TODO: add expiry
  const data = {entity: draft.entity}
  store.set(draft.contact.email, draft.entity);
}

const reducer = (draft, action) => {
  switch(action.type) {
      case "SET_CONTACT":
        const storedEntity = getStoredEntity(action.contact);
        if (storedEntity) {
          draft.entity = storedEntity;
        }
        draft.contact = action.contact;
        return;

      case "SET_ENTITY":
        draft.entity = action.entity;
        saveEntityToLocal(draft);
        return;

      default:
        return draft;
  }
}


const TerminalTicketWebController = (props) => {
  const { partner, service, location, history } = props

  const [step, setStep] = useState(2);
  const [completedStep, setCompletedStep] = useState(-1);

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
