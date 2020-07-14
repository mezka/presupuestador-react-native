import ky from 'ky';
import Constants from 'expo-constants';
import { fetchClientsPending, fetchClientsSuccess, fetchClientsError } from '../actions/fetchClientsActions';
import { addClientPending, addClientSuccess, addClientError} from '../actions/addClientActions';

const api_url = Constants.manifest.extra.api_url;

export const getClients = () => {
  return async (dispatch) => {
    
    dispatch(fetchClientsPending());
    
    try {
      let clients = await ky.get(`${ api_url }/clients`).json();

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
      let client = await ky.post(`${ api_url }/clients`, {name, address, phonenumber}).json();

      dispatch(addClientSuccess(client));
    } catch (error) {

      return dispatch(addClientError(error));
    }
  }
}