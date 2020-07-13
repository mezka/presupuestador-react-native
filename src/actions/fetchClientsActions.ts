export const FETCH_CLIENTS_PENDING = 'FETCH_CLIENTS_PENDING';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';

export const fetchClientsPending = () => {
  return {
    type: FETCH_CLIENTS_PENDING
  }
};

export const fetchClientsSuccess = (clients) => {
  return {
    type: FETCH_CLIENTS_SUCCESS,
    clients
  }
};

export const fetchClientsError = (error) => {
  return {
    type: FETCH_CLIENTS_ERROR,
    error
  }
};
