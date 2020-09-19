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
  const [mode, setMode] = useState(entity.guests.length > 0 ? "list" : "add");

  const addGuestHandler = () => {
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

  const onAddGuest = (guest) => {
    const updatedEntity = produce(entity, draft => {
      draft.guests.push(guest);
    });
    setEntity(updatedEntity);
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
    if (updatedEntity.guests.length >= entity.numguests) {
      setMode("list");
    }
  }

  const onUpdateGuest = (guest) => {
    const updatedEntity = produce(entity, draft => {
      const idx = draft.guests.findIndex(g => g.objid === guest.objid);
      if (idx >= 0) {
        draft.guests[idx] = guest;
      }
    });
    setEntity(updatedEntity);
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
    setMode("list");
  }

  const onSubmit = () => {
    moveNextStep();
  }

  if (mode !== "list") {
    return <Guest
      mode={mode}
      guest={selectedGuest}
      guestNumber={entity.guests.length + 1}
      onCancel={() => setMode("list")}
      onSubmit={mode === "add" ? onAddGuest : onUpdateGuest}
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
          action={addGuestHandler}
          variant="outlined"
        />
      </Panel>
      <ActionBar>
        <BackLink action={movePrevStep}/>
        <Button caption="Next" action={onSubmit} disableWhen={entity.guests.length === 0 }/>
      </ActionBar>
    </Panel>
  )
};


export default GuestsInformation;
