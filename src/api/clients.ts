import ky from '../extendedKy';
import { Client } from '../types.ts';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

export const getClients = (token) => {
  return ky.get(`${ api_url }/clients`, { headers: { Authorization: token }}).json();
}

export const addClient = (client: Client, token: any) => {
  return ky.post(`${ api_url }/clients`, { json: {...client}, headers: {Authorization: token} }).json();
}