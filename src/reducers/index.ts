import { combineReducers } from 'redux';
import estimate from './estimate';
import products from './products';
import clients from './clients';
import contacts from './contacts';
import auth from './auth';

export default combineReducers({
  estimate,
  products,
  clients,
  contacts,
  auth
});