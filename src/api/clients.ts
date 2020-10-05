import ky from 'ky';
import { Client } from '../types.ts';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

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

export const addClient = (client: Client, token: any) => {
  return ky.post(`${ api_url }/clients`, { json: {...client}, headers: {Authorization: token} }).json();
}