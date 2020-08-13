import { combineReducers } from 'redux';
import estimate from './estimate';
import products from './products';
import clients from './clients';

export default combineReducers({
  estimate,
  products,
  clients
});