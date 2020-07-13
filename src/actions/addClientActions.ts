export const ADD_CLIENT_PENDING = 'ADD_CLIENT_PENDING';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const ADD_CLIENT_ERROR = 'ADD_CLIENT_ERROR';

export const addClientPending = () => {
  return {
    type: ADD_CLIENT_PENDING,
  }
};

export const addClientSuccess = (client) => {
  return {
    type: ADD_CLIENT_SUCCESS,
    client
  }
};

export const addClientError = (error) => {
  return {
    type: ADD_CLIENT_ERROR,
    error
  }
};
