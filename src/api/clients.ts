import ky from 'ky';
import { Client } from '../types.ts';

const api_url = 'http://localhost:3030';

export const getClients = (token) => {
  const request = ky.extend({
    hooks: {
      beforeRequest: [
        request => {
          request.headers.set('Authorization', token);
        }
      ]
    }
  });
  return (async () => {
    return await request.get(`${ api_url }/clients`).json();
  })();
}

export const addClient = (client: Client, token) => {
  return ky.post(`${ api_url }/clients`, { json: {...client}, headers: {Authorization: token} }).json();
}