import ky from 'ky';

const afterResponse = async (request, options, response) => {

  const body = await response.json();

  if(!response.ok && !response.statusText){
    response.statusText = JSON.stringify(body.errors);
  }
 
  return response;
};

const extendedKy = ky.extend({
  hooks: {
    afterResponse: [afterResponse]
  }
});

export default extendedKy;