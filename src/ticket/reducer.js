import store from "store";


export const initialState = {
  contact: {},
  entity: {
    routes: [
      {objid: "R1", origin: "Caticlan", destination: "Cagban", title: "Caticlan - Cagban", selected: false},
      {objid: "R2", origin: "Cagban", destination: "Caticlan", title: "Cagban - Caticlan", selected: false },
    ],
    guests: [
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
        // const storedEntity = getStoredEntity(action.contact);
        // if (storedEntity) {
        //   draft.entity = storedEntity;
        // }
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


export default reducer;
