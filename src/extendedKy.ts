import ky from 'ky';

const afterResponse = async (request, options, response) => {

  const body = await response.json();

  if(!response.ok && !response.statusText){

    if(body.errors && body.errors.length || body.errors && body.errors instanceof Object && Object.values(body.errors).length){
      response.statusText = JSON.stringify(body.errors);
    } else {
      response.statusText = body.message;
    }
  }
 
  return response;
};

const extendedKy = ky.extend({
  hooks: {
    afterResponse: [afterResponse]
  }
});

export default extendedKy;