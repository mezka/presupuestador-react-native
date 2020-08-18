export const GET_CONTACTS_SUCCEDED = 'GET_CONTACTS_SUCCEDED';
export const GET_CONTACTS_FAILED = 'GET_CONTACTS_FAILED';
export const GET_CONTACTS_REQUESTED = 'GET_CONTACTS_REQUESTED';
export const GET_CONTACTS_PENDING = 'GET_CONTACTS_PENDING';

export const getContactsSucceded = (contacts) => ({
  type: GET_CONTACTS_SUCCEDED,
  pending: false,
  contacts
});

export const  getContactsFailed = (error) => ({
  type: GET_CONTACTS_FAILED,
  pending: false,
  error
});

export const getContactsPending = () => ({
  type: GET_CONTACTS_PENDING
});

export const getContacts = () => ({
  type: GET_CONTACTS_REQUESTED,
});

