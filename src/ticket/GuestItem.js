import React from "react";
import {
  Panel,
  Label,
  Avatar,
  EditButton,
  DeleteButton
} from "rsi-react-web-components";

const Guest = ({guest, idx, onEdit, onDelete}) => {
  const {lastname, firstname, age, gender, address} = guest;

  const name = `${lastname}, ${firstname}`;

  const fullAddress = guest.isfilipino ? (
    `${guest.citymuni}, ${guest.country}`
  ) : (
    `${guest.country}`
  )

  return (
    <Panel style={styles.container}>
      <Panel style={styles.infoContainer}>
        <div style={{paddingRight: 15}}>
          <Avatar style={styles.avatar}>{idx}</Avatar>
        </div>
        <Panel>
          <label style={styles.name}>{name}</label>
          <Panel row>
            <Label style={styles.label} captionStyle={{fontWeight: 0, width: 50}} caption="Age:">{age}</Label>
            <Label style={styles.label} captionStyle={{fontWeight: 0, paddingLeft: 30, width: 80}} caption="Gender:">{gender}</Label>
          </Panel>
          <Label style={styles.label}>{fullAddress}</Label>
        </Panel>
      </Panel>
      <Panel row>
        <EditButton action={() => onEdit(guest)} />
        <DeleteButton action={() => onDelete(guest)} />
      </Panel>
    </Panel>
  )
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "5px 5px",
    padding: "10px 25px",
    borderRadius: 10,
    boxShadow: "0px 5px 7px -5px rgba(0,0,0,0.75)",
    backgroundColor: "#E1F5FE"
  },
  infoContainer: {
    display: "flex",
  },
  avatar: {
    color: "white",
    backgroundColor: "orange",
    width: 25,
    height: 25,
  },
  label: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  name: {
    fontWeight: 500,
    fontSize: 20,
    opacity: 0.8
  }
}

export default Guest;
