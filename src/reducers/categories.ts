import {
  GET_CATEGORIES_SUCCEDED,
  GET_CATEGORIES_PENDING,
  GET_CATEGORIES_FAILED
} from '../actions/categories';


const categories = (state = { pending: false, categories: []}, action) => {
  switch(action.type){
    case GET_CATEGORIES_SUCCEDED:
      return {
        ...state,
        categories: action.categories,
        pending: false
      };
    case GET_CATEGORIES_PENDING:
      return {
        ...state,
        error: undefined,
        pending: true
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    default:
      return state;
  }
};

export default categories;