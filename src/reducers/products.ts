import {
  GET_PRODUCTS_SUCCEDED,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_PENDING,
  SET_PRODUCTS_FILTER,
  SET_PRODUCTS_SEARCH,
  SET_PRODUCTS_SEARCH_AND_FILTER,
  SET_PRODUCTS_CATEGORIES_FILTER,
  SET_PRODUCTS_SEARCH_AND_CATEGORIES_FILTER
} from '../actions/products';

import FlexSearch from 'flexsearch/dist/module/flexsearch';

const productIndex = new FlexSearch({
  doc: {
    id: "id",
    field: ["modelname", "price", "updatedAt", "categories0", "categories1", "categories2"]
  },
  tokenize: 'forward'
});

const createKeepProductsThatHaveOneOfTheseCategoriesFilter = function (categoryList) {

  return function (product) {

    const { id, modelname, price, updatedAt, ...productCategories } = product;

    let includesOneOfCategoryList = false;

    for (let i = 0; i < categoryList.length && !includesOneOfCategoryList; i++) {
      includesOneOfCategoryList = Object.values(productCategories).includes(categoryList[i]);
    }

    return includesOneOfCategoryList;
  };
}

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
      return {
        ...state,
        filteredProducts: productIndex.search(action.query, {
          where: action.filter
        })
      };
    case SET_PRODUCTS_CATEGORIES_FILTER:
      return {
        ...state,
        filteredProducts: productIndex.where(createKeepProductsThatHaveOneOfTheseCategoriesFilter(action.categories))
      };
    case SET_PRODUCTS_SEARCH_AND_CATEGORIES_FILTER:
      return {
        ...state,
        filteredProducts: productIndex.search(action.query, {
          where: createKeepProductsThatHaveOneOfTheseCategoriesFilter(action.categories)
        })
      };
    default:
      return state;
  }
}

export default products;