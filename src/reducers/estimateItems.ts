import {
  ADD_ESTIMATE_ITEM_WITH_PRICE,
  REMOVE_ESTIMATE_ITEM,
  CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE,
  GET_ESTIMATE_ITEMS,
  CHANGE_ESTIMATE_ITEM_QTY,
  CLEAR_ESTIMATE_ITEMS,
  LOAD_ESTIMATE_ITEM_WITH_PRICE
} from '../actions/estimateItems';

let itemId = 0;

const estimateItems = (state = {}, action) => {
  switch (action.type) {
    case ADD_ESTIMATE_ITEM_WITH_PRICE:
      return {
        ...state,
        [itemId++]: { productid: action.productid, quantity: action.quantity, unitprice: action.unitprice}
      };
    case REMOVE_ESTIMATE_ITEM:
      const {[action.itemId]: value, ...stateWithoutId} = state;
      return stateWithoutId;
    case CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE:
      return {
        ...state,
        [action.itemId]: { ...state[action.itemId], productid: action.productid, unitprice: action.unitprice}
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
    case LOAD_ESTIMATE_ITEM_WITH_PRICE:
      return {
        ...state,
        [itemId++]: { productid: action.productid, quantity: action.quantity, unitprice: action.unitprice}
      };
    default:
      return state;
  }
}

export default estimateItems;