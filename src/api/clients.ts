import ky from 'ky';
import Constants from 'expo-constants';
import { Client } from '../types.ts';

const api_url = Constants.manifest.extra.api_url;

export const getClients = () => {
  return ky.get(`${ api_url }/clients`).json();
}

export const addClient = (client: Client) => {

  return ky.post(`${ api_url }/clients`, { json: client }).json();
}