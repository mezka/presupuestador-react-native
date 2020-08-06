import {
  GET_PRODUCTS_SUCCEDED,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_PENDING,
  SET_PRODUCTS_FILTER,
  SET_PRODUCTS_SEARCH
} from '../actions/products';
import FlexSearch from 'flexsearch/dist/module/flexsearch';

const productIndex = new FlexSearch({
  doc: {
    id: "id",
    field: ["model", "modelstub", "category", "price"]
  },
  tokenize: 'forward'
});

const products = (state = { pending: false, products: productIndex.where(() => true) }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCEDED:
      productIndex.add(action.products);
      return {
        ...state,
        pending: false,
        products: productIndex.where(() => true)
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
    case SET_PRODUCTS_FILTER:
      return {
        ...state,
        products: productIndex.where(action.filter)
      };
    case SET_PRODUCTS_SEARCH:
      return {
        ...state,
        products: productIndex.search(action.query)
      };
    default:
      return state;
  }
}

export default products;