import React, { useState } from "react";
import produce from "immer";
import {
  Panel,
  Subtitle,
  Spacer,
  ActionBar,
  Button,
  BackLink,
  useData
} from "rsi-react-web-components";

import Guest from "./Guest";
import GuestItem from "./GuestItem";

const GuestsInformation = ({
  partner,
  service,
  location,
  history,
  moveNextStep,
  movePrevStep,
}) => {
  const [ctx, dispatch] = useData();
  const [entity, setEntity] = useState(ctx.entity);
  const [selectedGuest, setSelectedGuest] = useState({});
  const [mode, setMode] = useState("list");

  const onAddGuest = () => {
    setMode("add");
  }

  const onEditGuest = (guest) => {
    setSelectedGuest(guest);
    setMode("edit");
  }

  const onDeleteGuest = (guest) => {
    const updatedEntity = produce(entity, draft => {
      draft.guests = draft.guests.filter(g => g.objid !== guest.objid)
    });
    setEntity(updatedEntity);
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
  }

  const onSubmitGuest = (guest) => {
    let updatedEntity;
    if (mode === "add") {
      updatedEntity = produce(entity, draft => {
        draft.guests.push(guest);
      });
    } else {
      updatedEntity = produce(entity, draft => {
        const idx = draft.guests.findIndex(g => g.objid === guest.objid);
        if (idx >= 0) {
          draft.guests[idx] = guest;
        }
      });
    }
    setEntity(updatedEntity);
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
    setMode("list");
  }

  const onSubmit = () => {

  }

  if (mode !== "list") {
    return <Guest
      mode={mode}
      guest={selectedGuest}
      onCancel={() => setMode("list")}
      onSubmit={onSubmitGuest}
    />
  }

  return (
    <Panel>
      <Subtitle>Guests Information</Subtitle>
      <Spacer />
      <Panel>
        {entity.guests.map((guest, idx) =>
          <GuestItem
            key={guest.objid}
            idx={idx+1}
            guest={guest}
            onEdit={onEditGuest}
            onDelete={onDeleteGuest}
          />
        )}
      </Panel>
      <Spacer />
      <Panel row>
        <Button
          caption="Add Guest"
          action={onAddGuest}
          variant="outlined"
          visibleWhen={entity.numguests > entity.guests.length}
        />
      </Panel>
      <ActionBar>
        <BackLink action={movePrevStep}/>
        <Button caption="Next" action={onSubmit} disableWhen={entity.numguests > entity.guests.length}/>
      </ActionBar>
    </Panel>
  )
};


export default GuestsInformation;
