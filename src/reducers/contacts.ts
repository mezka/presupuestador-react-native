import {
  GET_CONTACTS_SUCCEDED,
  GET_CONTACTS_FAILED,
  GET_CONTACTS_PENDING,
  SET_CONTACTS_FILTER,
  SET_CONTACTS_SEARCH,
  SET_CONTACTS_SEARCH_AND_FILTER
} from '../actions/contacts';
import FlexSearch from 'flexsearch/dist/module/flexsearch';

const contactsIndex = new FlexSearch({
  doc: {
    id: "id",
    field: ["adddress0", "address1", "address2", "email0", "email1", "email2", "name", "phonenumber0", "phonenumber1", "phonenumber2"]
  },
  tokenize: 'forward'
});

const contacts = (state = { pending: false, contacts: [] }, action) => {
  switch (action.type) {
    case GET_CONTACTS_SUCCEDED:
      contactsIndex.add(action.contacts);
      return {
        ...state,
        pending: false,
        contacts: contactsIndex.where(() => true),
        filteredContacts: contactsIndex.where(() => true)
      };
    case GET_CONTACTS_FAILED:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case GET_CONTACTS_PENDING:
      return {
        ...state,
        pending: true,
        error: undefined
      };
    case SET_CONTACTS_FILTER:
      return {
        ...state,
        filteredContacts: contactsIndex.where(action.filter),
      };
    case SET_CONTACTS_SEARCH:
      return {
        ...state,
        filteredContacts: contactsIndex.search(action.query)
      };
    case SET_CONTACTS_SEARCH_AND_FILTER:
      return {
        ...state,
        filteredContacts: contactsIndex.search(action.query, {
          where: action.filter
        })
      };
    default:
      return state;
  }
}

export default contacts;