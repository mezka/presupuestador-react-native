import ky from 'ky';
import { Client } from '../types.ts';

const dev_api_url = 'http://localhost:3030';

export const getClients = (token) => {
  return ky.get(`${ dev_api_url }/clients`, { json: {accessToken: token} }).json();
}

export const addClient = (client: Client, token) => {

  return ky.post(`${ dev_api_url }/clients`, { json: {...client, accessToken: token} }).json();
}