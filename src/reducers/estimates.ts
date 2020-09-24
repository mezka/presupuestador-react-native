import {
    ADD_ESTIMATE_PENDING,
    ADD_ESTIMATE_FAILED,
    ADD_ESTIMATE_SUCCEDED
  } from '../actions/estimates';
  
  const estimates = (state = {pending: false, estimate: {}}, action) => {
    switch (action.type) {
      case ADD_ESTIMATE_SUCCEDED:
        return {
          ...state,
          pending: false,
          estimate: action.estimate
        };
      case ADD_ESTIMATE_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case ADD_ESTIMATE_PENDING:
        return {
          ...state,
          pending: true,
          error: undefined
        };
      default:
        return state;
    }
  }
  
  export default estimates;