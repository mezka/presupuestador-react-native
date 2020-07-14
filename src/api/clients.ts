import ky from 'ky';
import { fetchClientsPending, fetchClientsSuccess, fetchClientsError } from '../actions/fetchClientsActions';
import { addClientPending, addClientSuccess, addClientError} from '../actions/addClientActions';

export const getClients = () => {
  return async (dispatch) => {
    
    dispatch(fetchClientsPending());
    
    try {
      let clients = await ky.get('http://192.168.0.14:3000/clients').json();

      console.log(clients);

      dispatch(fetchClientsSuccess(clients));
    } catch (error) {

      return dispatch(fetchClientsError(error));
    }
  }
}

export const addClient = ({name, address, phonenumber}) => {
  return async (dispatch) => {
    
    dispatch(addClientPending());
    
    try {
      let client = await ky.post('http://192.168.0.14:3000/clients', {name, address, phonenumber}).json();

      dispatch(addClientSuccess(client));
    } catch (error) {

      return dispatch(addClientError(error));
    }
  }
}