export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const fetchProductsPending = () => {
  return {
    type: FETCH_PRODUCTS_PENDING
  }
};

export const fetchProductsSuccess = (clients) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    clients
  }
};

export const fetchProductsError = (error) => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error
  }
};
