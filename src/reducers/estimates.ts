import {
    ADD_ESTIMATE_PENDING,
    ADD_ESTIMATE_FAILED,
    ADD_ESTIMATE_SUCCEDED,
    GET_ESTIMATES_PENDING,
    GET_ESTIMATES_FAILED,
    GET_ESTIMATES_SUCCEDED,
    EXPORT_ESTIMATE_PENDING,
    EXPORT_ESTIMATE_FAILED,
    EXPORT_ESTIMATE_SUCCEDED,
    UPDATE_ESTIMATE_PENDING,
    UPDATE_ESTIMATE_FAILED,
    UPDATE_ESTIMATE_SUCCEDED
  } from '../actions/estimates';
  
  const estimates = (state = {pending: false, estimates: []}, action) => {
    switch (action.type) {
      case ADD_ESTIMATE_SUCCEDED:
        return {
          ...state,
          pending: false,
          error: undefined
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

      case EXPORT_ESTIMATE_SUCCEDED:
        return {
          ...state,
          pending: false,
          estimates: state.estimates.map((estimate) => estimate.id === action.estimateId? {...estimate, localUri: action.localUri} : estimate)
        };
      case EXPORT_ESTIMATE_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case EXPORT_ESTIMATE_PENDING:
        return {
          ...state,
          pending: true,
          error: undefined
        };

      case UPDATE_ESTIMATE_SUCCEDED:
        return {
          ...state,
          pending: false,
        };
      case UPDATE_ESTIMATE_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case UPDATE_ESTIMATE_PENDING:
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