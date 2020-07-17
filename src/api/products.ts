import ky from 'ky';
import Constants from 'expo-constants';

export const getProducts = () => {
  return ky.get(`${ Constants.manifest.extra.api_url }/products`).json();
}
