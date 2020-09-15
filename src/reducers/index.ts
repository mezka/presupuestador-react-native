import { combineReducers } from 'redux';
import estimate from './estimate';
import products from './products';
import clients from './clients';
import contacts from './contacts';
import users from './users';

export default combineReducers({
  estimate,
  products,
  clients,
  contacts,
  users
});