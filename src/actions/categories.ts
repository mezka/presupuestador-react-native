export const GET_CATEGORIES_SUCCEDED = 'GET_CATEGORIES_SUCCEDED';
export const GET_CATEGORIES_PENDING = 'GET_CATEGORIES_PENDING';
export const GET_CATEGORIES_REQUESTED = 'GET_CATEGORIES_REQUESTED';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';

export const getCategoriesSucceded = (categories) => ({
  type: GET_CATEGORIES_SUCCEDED,
  categories
});

export const getCategoriesPending = () => ({
  type: GET_CATEGORIES_PENDING
});

export const getCategoriesFailed = (error) => ({
  type: GET_CATEGORIES_FAILED,
  error
});

export const getCategories = () => ({
  type: GET_CATEGORIES_REQUESTED,
})