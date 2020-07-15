import { FETCH_CLIENTS_PENDING, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_ERROR } from '../actions/fetchClientsActions';

const fetchClientsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_PENDING:
      return {
        ...state,
        pending: [...state.pending, action.type]
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.clients,
        pending: state.pending.filter((type: string) => type !==  FETCH_CLIENTS_PENDING)
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        pending: state.pending.filter((type: string) => type !==  FETCH_CLIENTS_PENDING),
        error: [...state.error, action.error]
      }
    default:
      return state;
  }
};

export default fetchClientsReducer;