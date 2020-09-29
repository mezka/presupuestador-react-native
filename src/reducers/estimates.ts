import {
    ADD_ESTIMATE_PENDING,
    ADD_ESTIMATE_FAILED,
    ADD_ESTIMATE_SUCCEDED,
    GET_ESTIMATES_PENDING,
    GET_ESTIMATES_FAILED,
    GET_ESTIMATES_SUCCEDED
  } from '../actions/estimates';
  
  const estimates = (state = {pending: false, estimates: {}, estimate: {}}, action) => {
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
      case GET_ESTIMATES_SUCCEDED:
        return {
          ...state,
          pending: false,
          estimates: action.estimates
        };
      case GET_ESTIMATES_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case GET_ESTIMATES_PENDING:
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