import {
  ADD_ESTIMATE_ITEM,
  REMOVE_ESTIMATE_ITEM,
  CHANGE_ESTIMATE_ITEM_PRODUCT,
  GET_ESTIMATE_ITEMS,
  CHANGE_ESTIMATE_ITEM_QTY
} from '../actions/estimateItems';

let itemId = 0;

const estimate = (state = [], action) => {
  switch (action.type) {
    case ADD_ESTIMATE_ITEM:
      return {
        ...state,
        [itemId++]: { productId: action.productId, quantity: action.quantity}
      };
    case REMOVE_ESTIMATE_ITEM:
      const {[action.itemId]: value, ...stateWithoutId} = state;
      return stateWithoutId;
    case CHANGE_ESTIMATE_ITEM_PRODUCT:
      return {
        ...state,
        [action.itemId]: { ...state[action.itemId], productId: action.productId}
      };
    case CHANGE_ESTIMATE_ITEM_QTY:
      return {
        ...state,
        [action.itemId]: {...state[action.itemId], quantity: action.quantity}
      };
    case GET_ESTIMATE_ITEMS:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default estimate;