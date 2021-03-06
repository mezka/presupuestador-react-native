export const GET_PRODUCTS_SUCCEDED = 'GET_PRODUCTS_SUCCEDED';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';
export const GET_PRODUCTS_REQUESTED = 'GET_PRODUCTS_REQUESTED';
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
export const SET_PRODUCTS_FILTER = 'SET_PRODUCTS_FILTER';
export const SET_PRODUCTS_SEARCH = 'SET_PRODUCTS_SEARCH';
export const SET_PRODUCTS_SEARCH_AND_FILTER = 'SET_PRODUCTS_SEARCH_AND_FILTER';
export const SET_PRODUCTS_CATEGORIES_FILTER = 'SET_PRODUCTS_CATEGORIES_FILTER';
export const SET_PRODUCTS_SEARCH_AND_CATEGORIES_FILTER = 'SET_PRODUCTS_SEARCH_AND_CATEGORIES_FILTER';

export const getProductsSucceded = (products) => ({
  type: GET_PRODUCTS_SUCCEDED,
  pending: false,
  products
});

export const  getProductsFailed = (error) => ({
  type: GET_PRODUCTS_FAILED,
  pending: false,
  error
});

export const getProducts = () => ({
  type: GET_PRODUCTS_REQUESTED,
});

export const getProductsPending = () => ({
  type: GET_PRODUCTS_PENDING
});

export const setProductsFilter = (filter) => ({
  type: SET_PRODUCTS_FILTER,
  filter
});

export const setProductsSearch = (query) => ({
  type: SET_PRODUCTS_SEARCH,
  query
});

export const setProductsSearchAndFilter = (query, filter) => ({
  type: SET_PRODUCTS_SEARCH_AND_FILTER,
  query,
  filter
});

export const setProductsSearchAndCategoriesFilter = (query, categories) => ({
  type: SET_PRODUCTS_SEARCH_AND_CATEGORIES_FILTER,
  query,
  categories
});

export const setProductsCategoriesFilter = (categories) => ({
  type: SET_PRODUCTS_CATEGORIES_FILTER,
  categories
});