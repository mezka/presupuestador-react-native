import {
  GET_PRODUCTS_SUCCEDED,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_PENDING,
  SET_PRODUCTS_FILTER,
  SET_PRODUCTS_SEARCH,
  SET_PRODUCTS_SEARCH_AND_FILTER
} from '../actions/products';
import FlexSearch from 'flexsearch/dist/module/flexsearch';

const productIndex = new FlexSearch({
  doc: {
    id: "id",
    field: ["modelname", "price", "updatedAt", "categories0", "categories1", "categories2"]
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
        products: productIndex.where(() => true),
        filteredProducts: productIndex.where(() => true)
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
        filteredProducts: productIndex.where(action.filter),
      };
    case SET_PRODUCTS_SEARCH:
      return {
        ...state,
        filteredProducts: productIndex.search(action.query)
      };
    case SET_PRODUCTS_SEARCH_AND_FILTER:

      console.log(SET_PRODUCTS_SEARCH_AND_FILTER);
      console.log(action.query);
      console.log(action.filter);

      console.log(productIndex.search(action.query, {
        where: action.filter
      }));

      return {
        ...state,
        filteredProducts: productIndex.search(action.query, {
          where: action.filter
        })
      };
    default:
      return state;
  }
}

export default products;