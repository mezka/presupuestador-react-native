import { FETCH_CLIENTS_PENDING, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_ERROR } from '../actions/fetchClientsActions';

const fetchClientsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        clients: action.clients
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    default:
      return state;
  }
};

export default fetchClientsReducer;
