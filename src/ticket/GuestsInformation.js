import React, { useState, useEffect } from "react";
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
  setGuestsInfo
}) => {
  const [ctx, dispatch] = useData();
  const [entity, setEntity] = useState(ctx.entity);
  const [selectedGuest, setSelectedGuest] = useState({});
  const [mode, setMode] = useState("add");

  useEffect(() => {
    setGuestsInfo({mode, guests: entity.guests});
  }, []);

  const addGuestHandler = () => {
    setGuestsInfo({mode: "add", guests: entity.guests});
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
    setGuestsInfo({mode, guests: updatedEntity.guests});
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
  }

  const onAddGuest = (guest) => {
    const updatedEntity = produce(entity, draft => {
      draft.guests.push(guest);
    });
    setEntity(updatedEntity);
    setGuestsInfo({mode, guests: updatedEntity.guests});
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
  }

  const onUpdateGuest = (guest) => {
    const updatedEntity = produce(entity, draft => {
      const idx = draft.guests.findIndex(g => g.objid === guest.objid);
      if (idx >= 0) {
        draft.guests[idx] = guest;
      }
    });
    setEntity(updatedEntity);
    setGuestsInfo({mode, guests: updatedEntity.guests});
    dispatch({type: "SET_ENTITY", entity: updatedEntity });
    setMode("list");
  }

  const onCancel = () => {
    setGuestsInfo({mode: "list", guests: entity.guests});
    setMode("list");
  }

  const onSubmit = () => {
    moveNextStep();
  }

  if (mode !== "list") {
    return <Guest
      mode={mode}
      guest={mode === "add" ? {} : selectedGuest}
      guestNumber={entity.guests.length + 1}
      onCancel={onCancel}
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
