import ky from 'ky';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

export const getProducts = (token) => {
  ky.get(`${ api_url }/products`, { headers: { Authorization: token } }).json();
}