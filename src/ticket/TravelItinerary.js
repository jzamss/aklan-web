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
  Error,
  useData,
  isDateBefore,
  isDateAfter
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
  const [entity, setEntity] = useState({...ctx.entity});
  const [error, setError] = useState();
  const [routeErrors, setRouteErrors] = useState([{},{}]);

  const validateTravel = () => {
    setError(null);
    const selectedIdx = entity.routes.findIndex(route => route.selected);
    if (selectedIdx < 0) {
      throw "Kindly select at least one (1) travel destination";
    }

    let hasError = false;
    const errors = entity.routes.map((route, idx) => {
      if (route.selected) {
        if (!route.traveldate) {
          hasError = true;
          return {error: "Travel date is required"};
        }
        if (idx == 0 && !isDateAfter(route.traveldate)) {
          hasError = true;
          return {error: "Date must be on or after current date"}
        }
        if (idx == 1 && entity.routes[0].selected && entity.routes[0].traveldate) {
          const entryDate = entity.routes[0].traveldate;
          const returnDate = route.traveldate;
          if (isDateBefore(returnDate, entryDate)) {
            hasError = true;
            return {error: "Date must be after " + entryDate}
          }
        }
      }
      return {error: null};
    })

    if (hasError) {
      setRouteErrors(errors);
      throw null;
    }
  }

  const onSubmit = () => {
    try {
      validateTravel();
      dispatch({type: "SET_ENTITY", entity});
      moveNextStep();
    } catch (err) {
      setError(err);
    }
  }

  return (
    <Panel>
      <Subtitle>Travel Itinerary</Subtitle>
      <Spacer />
      <FormPanel context={entity} handler={setEntity}>
        <h4>Specify Dates of Travel</h4>
        <Error msg={error} />
        {entity.routes.map((route, idx) =>
          <Panel style={styles.itineraryContainer} key={route.objid}>
            <Checkbox caption={`${route.origin} - ${route.destination}`} name={`routes[${idx}].selected`} />
            <Date
              name={`routes[${idx}].traveldate`}
              fullWidth={false}
              style={{width: 200}}
              placeholder="mm/dd/yyyy"
              variant="filled"
              error={routeErrors[idx].error}
              helperText={routeErrors[idx].error}
              readOnly={!entity.routes[idx].selected}
            />
          </Panel>
        )}
      </FormPanel>
      <ActionBar>
        <BackLink action={movePrevStep}/>
        <Button caption="Next" action={onSubmit} />
      </ActionBar>
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
