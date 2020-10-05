export const ADD_USER_REQUESTED = 'ADD_USER_REQUESTED';
export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_SUCCEDED = 'ADD_USER_SUCCEDED';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export const LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED';
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCEDED = 'LOGIN_USER_SUCCEDED';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
  
export const addUser = (user) => ({
    type: ADD_USER_REQUESTED,
    user: user
});
  
export const addUserPending = () => ({
    type: ADD_USER_PENDING,
    pending: true
});
  
export const addUserSucceded = () => ({
    type: ADD_USER_SUCCEDED,
    pending: false
});
  
export const addUserFailed = (error) => ({
    type: ADD_USER_FAILED,
    error
});

export const loginUser = (user) => ({
    type: LOGIN_USER_REQUESTED,
    user: user
});
  
export const loginUserPending = () => ({
    type: LOGIN_USER_PENDING,
    pending: true
});

export const loginUserSucceded = (user, accessToken) => ({
    type: LOGIN_USER_SUCCEDED,
    pending: false,
    user,
    token: accessToken
});
  
export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    error
});