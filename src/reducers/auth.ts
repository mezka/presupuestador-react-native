import {
    ADD_USER_PENDING,
    ADD_USER_FAILED,
    ADD_USER_SUCCEDED,
    LOGIN_USER_PENDING,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCEDED
  } from '../actions/auth';
  
  const auth = (state = {pending: false, user: {}}, action) => {
    switch (action.type) {
      case ADD_USER_SUCCEDED:
        return {
          ...state,
          pending: false,
          user: action.user,
        };
      case ADD_USER_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case ADD_USER_PENDING:
        return {
          ...state,
          pending: true,
          error: undefined
        };
      case LOGIN_USER_SUCCEDED:
        return {
          ...state,
          pending: false,
          user: action.user,
          token: action.token
        };
      case LOGIN_USER_FAILED:
        return {
          ...state,
          pending: false,
          error: action.error
        };
      case LOGIN_USER_PENDING:
        return {
          ...state,
          pending: true,
          error: undefined
        };
      default:
        return state;
    }
  }
  
  export default auth;