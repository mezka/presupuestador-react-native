import { combineReducers } from 'redux';
import estimateItems from './estimateItems';
import products from './products';
import clients from './clients';
import contacts from './contacts';
import auth from './auth';
import estimates from './estimates';
import categories from './categories';

export default combineReducers({
  estimateItems,
  products,
  clients,
  contacts,
  estimates,
  auth,
  categories
});