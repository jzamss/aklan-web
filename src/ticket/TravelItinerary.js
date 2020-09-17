import React, { useState } from "react";
import {
  FormPanel,
  Panel,
  Subtitle,
  Checkbox,
  Integer,
  Date,
  Label,
  Spacer,
  ActionBar,
  Button,
  BackLink,
  useData
} from "rsi-react-web-components";

const TravelItinerary = ({
  partner,
  service,
  location,
  history,
  moveNextStep,
  movePrevStep,
}) => {
  const [ctx, dispatch] = useData();
  const [entity, setEntity] = useState({...ctx.entity})

  const onSubmit = () => {
    dispatch({type: "SET_ENTITY", entity});
    moveNextStep();
  }

  return (
    <Panel>
      <Subtitle>Travel Itinerary</Subtitle>
      <Spacer />
      <FormPanel context={entity} handler={setEntity}>
        <h4>Specify Dates of Travel</h4>
        {entity.routes.map((route, idx) =>
          <Panel style={styles.itineraryContainer} key={route.objid}>
            <Checkbox caption={route.title} name={`routes[${idx}].selected`} />
              <Date
                name={`routes[${idx}].traveldate`}
                fullWidth={false}
                style={{width: 200}}
                placeholder="mm/dd/yyyy"
                variant="filled"
                helperText=""
                readOnly={!entity.routes[idx].selected}
              />
          </Panel>
        )}
        <Spacer />
        <Panel row>
          <label style={styles.text}>No. of Guests</label>
          <Integer name="numguests" variant="outlined" style={{width: 60}}/>
        </Panel>
      </FormPanel>
      <ActionBar>
        <BackLink action={movePrevStep}/>
        <Button caption="Next" action={onSubmit} />
      </ActionBar>
      <p>{JSON.stringify(entity, null, 2)}</p>
    </Panel>
  )
};

const styles = {
  itineraryContainer: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #aaa",
    padding: "0px 15px",
    marginBottom: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: 800,
    marginRight: 15,
  }
};

export default TravelItinerary;
