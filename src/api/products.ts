import ky from 'ky';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

export const getProducts = (token) => {
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
    return await request.get(`${ api_url }/products`).json();
  })();
}