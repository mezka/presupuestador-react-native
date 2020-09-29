import ky from 'ky';

const api_url = 'http://localhost:3030';

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