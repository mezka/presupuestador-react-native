import ky from 'ky';
import { Estimate } from '../types.ts';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const api_url = Constants.manifest.extra.api_url;

export const addEstimate = (estimate: Estimate, token) => {
  return ky.post(`${ api_url }/estimates`, { json: {...estimate}, headers: { Authorization: token } }).json();
}

export const getEstimates = (token) => {
  return ky.get(`${ api_url }/estimates`, { headers: { Authorization: token }}).json();
}

export const downloadEstimate = function (estimateId, mode, token) {
  return FileSystem.downloadAsync(`${ api_url }/estimates/${estimateId}?export=${ mode }`, FileSystem.documentDirectory + 'new.pdf', { headers: { Authorization: token }});
}