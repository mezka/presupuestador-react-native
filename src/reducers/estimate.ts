import {
  ADD_ESTIMATE_ITEM_WITH_PRICE,
  REMOVE_ESTIMATE_ITEM,
  CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE,
  GET_ESTIMATE_ITEMS,
  CHANGE_ESTIMATE_ITEM_QTY,
  CLEAR_ESTIMATE_ITEMS,
  SHOW_ESTIMATE_ITEM
} from '../actions/estimateItems';

let itemId = 0;

const estimate = (state = {}, action) => {
  switch (action.type) {
    case ADD_ESTIMATE_ITEM_WITH_PRICE:
      return {
        ...state,
        [itemId++]: { productId: action.productId, quantity: action.quantity, price: action.price}
      };
    case REMOVE_ESTIMATE_ITEM:
      const {[action.itemId]: value, ...stateWithoutId} = state;
      return stateWithoutId;
    case CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE:
      return {
        ...state,
        [action.itemId]: { ...state[action.itemId], productId: action.productId, price: action.price}
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
    case CLEAR_ESTIMATE_ITEMS:
      return {};
    case SHOW_ESTIMATE_ITEM:
      return {
        ...state,
        [itemId++]: { productId: action.productId, quantity: action.quantity, price: action.unitprice}
      };
    default:
      return state;
  }
}

export default estimate;