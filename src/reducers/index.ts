import { combineReducers } from 'redux';
import estimate from './estimate';
import products from './products';

export default combineReducers({
  estimate,
  products
});