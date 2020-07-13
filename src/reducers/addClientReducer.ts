import { ADD_CLIENT_PENDING, ADD_CLIENT_SUCCESS, ADD_CLIENT_ERROR } from '../actions/addClientActions';

const addClientReducer = (state, action) => {
  switch(action.type){
    case ADD_CLIENT_PENDING:
      return {
        ...state,
        pending: true
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.client],
        pending: false
      };
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default addClientReducer;