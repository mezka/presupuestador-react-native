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
        let error_msg = String(action.error);
        switch(error_msg){
          case 'HTTPError: Unauthorized':
            console.log('Datos de autenticación incorrectos');
            break;
          default:
            console.log('Error de autenticación indefinido');
        }
        return {
          ...state,
          pending: false,
          error: error_msg
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