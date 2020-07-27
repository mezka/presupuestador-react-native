export const GET_PRODUCTS_SUCCEDED = 'GET_PRODUCTS_SUCCEDED';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';
export const GET_PRODUCTS_REQUESTED = 'GET_PRODUCTS_REQUESTED';
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';

export const getProductsSucceded = (products) => ({
  type: GET_PRODUCTS_SUCCEDED,
  pending: false,
  products
});

export const  getProductsFailed = (error) => ({
  type: GET_PRODUCTS_SUCCEDED,
  pending: false,
  error
})

export const getProducts = () => ({
  type: GET_PRODUCTS_REQUESTED,
})

export const getProductsPending = () => ({
  type: GET_PRODUCTS_PENDING
})