import {
  ADD_ESTIMATE_ITEM,
  REMOVE_ESTIMATE_ITEM,
  CHANGE_ESTIMATE_ITEM_PRODUCT,
  GET_ESTIMATE_ITEMS,
  CHANGE_ESTIMATE_ITEM_QTY
} from '../actions/estimateItems';
import { GET_PRODUCTS_SUCCEDED, GET_PRODUCTS_FAILED, GET_PRODUCTS_PENDING } from '../actions/products';

const products = (state = { pending: false, products: []}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCEDED:
      return {
        ...state,
        pending: false,
        products: action.products
      };
    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true,
        error: undefined
      };
    default:
      return state;
  }
}

export default products;