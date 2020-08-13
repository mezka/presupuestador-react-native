import {
  GET_CLIENTS_SUCCEDED,
  GET_CLIENTS_FAILED,
  GET_CLIENTS_PENDING,
} from '../actions/clients';

const clients = (state = {pending: false, clients: []}, action) => {
  switch (action.type) {
    case GET_CLIENTS_SUCCEDED:
      return {
        ...state,
        pending: false,
        clients: action.clients,
      };
    case GET_CLIENTS_FAILED:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case GET_CLIENTS_PENDING:
      return {
        ...state,
        pending: true,
        error: undefined
      };
    default:
      return state;
  }
}

export default clients;