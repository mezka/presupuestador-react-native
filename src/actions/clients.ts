export const GET_CLIENTS_SUCCEDED = 'GET_CLIENTS_SUCCEDED';
export const GET_CLIENTS_FAILED = 'GET_CLIENTS_FAILED';
export const GET_CLIENTS_PENDING = 'GET_CLIENTS_PENDING';
export const ADD_CLIENT_PENDING = 'ADD_CLIENT_PENDING';
export const ADD_CLIENT_FAILED = 'ADD_CLIENT_FAILED';
export const ADD_CLIENT_SUCCEDED = 'ADD_CLIENT_SUCCEDED';
export const GET_CLIENTS_REQUESTED = 'GET_CLIENTS_REQUESTED';
export const ADD_CLIENT_REQUESTED = 'ADD_CLIENT_REQUESTED';
export const ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED = 'ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED';
export const UPDATE_CLIENT_REQUESTED = 'UPDATE_CLIENT_REQUESTED';
export const UPDATE_CLIENT_PENDING = 'UPDATE_CLIENT_PENDING';
export const UPDATE_CLIENT_SUCCEDED = 'UPDATE_CLIENT_SUCCEDED';
export const UPDATE_CLIENT_FAILED = 'UPDATE_CLIENT_FAILED';

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

export const addClient = (client) => ({
  type: ADD_CLIENT_REQUESTED,
  client
});

export const addClientPending = () => ({
  type: ADD_CLIENT_PENDING,
  pending: true
});

export const addClientSucceded = (client) => ({
  type: ADD_CLIENT_SUCCEDED,
  pending: false,
  client
});

export const addClientFailed = (error) => ({
  type: ADD_CLIENT_FAILED,
  error
});

export const addClientAndNavigateToPresupuestador = (client) => ({
  type: ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED,
  client
});

export const updateClient = (client) => ({
  type: UPDATE_CLIENT_REQUESTED,
  client
});

export const updateClientPending = () => ({
  type: UPDATE_CLIENT_PENDING,
  pending: true
});

export const updateClientSucceded = () => ({
  type: UPDATE_CLIENT_SUCCEDED,
  pending: false
});

export const updateClientFailed = (error) => ({
  type: UPDATE_CLIENT_FAILED,
  error
});