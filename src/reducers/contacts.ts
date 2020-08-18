import {
  GET_CONTACTS_SUCCEDED,
  GET_CONTACTS_FAILED,
  GET_CONTACTS_PENDING,
} from '../actions/contacts';

const contacts = (state = {pending: false, contacts: []}, action) => {
  switch (action.type) {
    case GET_CONTACTS_SUCCEDED:
      return {
        ...state,
        pending: false,
        contacts: action.contacts,
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
    default:
      return state;
  }
}

export default contacts;