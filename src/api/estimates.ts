import ky from 'ky';
import { Estimate } from '../types.ts';

const api_url = 'http://localhost:3030';

export const addEstimate = (estimate: Estimate, token) => {
  console.log(token);
  return ky.post(`${ api_url }/estimates`, { json: {...estimate}, headers: {Authorization: token} });
}

export const getEstimates = (token) => {
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
    return await request.get(`${ api_url }/estimates`).json();
  })();
}

export const exportEstimateAsFile = (estimateId, mode, token) => {
  const request = ky.extend({
    hooks: {
      beforeRequest: [
        (request, options) => {
          request.headers.set('Authorization', token);
        }
      ],
      afterResponse: [
        (request, options, response) => {
            switch(mode){
              case 'pdf':
                response.blob().then(blob => {
                  const url = URL.createObjectURL(blob);
                  window.open(url);
                });
                break;
              default:
                console.log(response.body);
            }
        }
      ]
    }
  });
  return (async () => {
    return await request.get(`${ api_url }/estimates/${estimateId}?export=${mode}`);
  })();
}