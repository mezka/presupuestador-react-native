import ky from 'ky';

const dev_api_url = 'http://localhost:3030';

export const getProducts = (token) => {
  return ky.get(`${ dev_api_url }/products`, { json: {accessToken: token} }).json();
}
