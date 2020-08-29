import {
  GET_CLIENTS_SUCCEDED,
  GET_CLIENTS_FAILED,
  GET_CLIENTS_PENDING,
  ADD_CLIENT_PENDING,
  ADD_CLIENT_FAILED,
  ADD_CLIENT_SUCCEDED
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
    case ADD_CLIENT_FAILED:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case ADD_CLIENT_PENDING:
      return {
        ...state,
        pending: true,
        error: undefined
      };
    case ADD_CLIENT_SUCCEDED:
      return {
        ...state,
        clients: [...state.clients, action.client],
        pending: false
      }
    default:
      return state;
  }
}

export default clients;