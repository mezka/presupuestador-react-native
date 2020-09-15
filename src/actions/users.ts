export const ADD_USER_REQUESTED = 'ADD_USER_REQUESTED';
export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_SUCCEDED = 'ADD_USER_SUCCEDED';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';
  
export const addUser = (user) => {
    return {
        type: ADD_USER_REQUESTED,
        user: user
    };
}
  
export const addUserPending = () => ({
    type: ADD_USER_PENDING,
    pending: true
});
  
export const addUserSucceded = (user) => ({
    type: ADD_USER_SUCCEDED,
    pending: false,
    user
});
  
export const addUserFailed = (error) => ({
    type: ADD_USER_FAILED,
    error
});