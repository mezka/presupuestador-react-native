export const GET_CLIENTS_SUCCEDED = 'GET_CLIENTS_SUCCEDED';
export const GET_CLIENTS_FAILED = 'GET_CLIENTS_FAILED';
export const GET_CLIENTS_REQUESTED = 'GET_CLIENTS_REQUESTED';
export const GET_CLIENTS_PENDING = 'GET_CLIENTS_PENDING';

export const getClientsSucceded = (clients) => ({
  type: GET_CLIENTS_SUCCEDED,
  pending: false,
  clients
});

export const  getClientsFailed = (error) => ({
  type: GET_CLIENTS_FAILED,
  pending: false,
  error
});

export const getClients = () => ({
  type: GET_CLIENTS_REQUESTED,
});

export const getClientsPending = () => ({
  type: GET_CLIENTS_PENDING
});