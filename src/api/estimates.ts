import ky from 'ky';
import { Estimate } from '../types.ts';

const dev_api_url = 'http://localhost:3030';

export const addEstimate = (estimate: Estimate) => {
  console.log(estimate);
  return ky.post(`${ dev_api_url }/estimates`, { json: {...estimate} }).json();
}