import { ADD_ESTIMATE_ITEM_WITH_PRICE, REMOVE_ESTIMATE_ITEM, CHANGE_ESTIMATE_ITEM_PRODUCT_AND_PRICE, CHANGE_ESTIMATE_ITEM_QTY, GET_ESTIMATE_ITEMS, CLEAR_ESTIMATE_ITEMS } from '../actions/estimateItems';

let checkboxId = 0;

const estimateItems = (state = { estimateItemsList: [], estimateItems: {} }, action) => {
  switch (action.type) {
    case ADD_ESTIMATE_ITEM_WITH_PRICE:
      const estimateItemsAfterAdd = {
        ...state.estimateItems,
        [checkboxId]: {
          'productid': action.productid,
          'quantity': action.quantity,
          'unitprice': action.unitprice,
          'checkboxId': checkboxId++
        }
      };
      return { estimateItemsList: Object.values(estimateItemsAfterAdd), estimateItems: { ...estimateItemsAfterAdd } };
    case REMOVE_ESTIMATE_ITEM:
      const { [action.checkboxId]: removedValue, ...estimateItemsAfterRemove } = state.estimateItems;
      return { estimateItemsList: Object.values(estimateItemsAfterRemove), estimateItems: { ...estimateItemsAfterRemove } };
    case CHANGE_ESTIMATE_ITEM_PRODUCT_AND_PRICE:
      const estimateItemsAfterProductAndPriceChange = { ...state.estimateItems, [action.checkboxId]: { ...state.estimateItems[action.checkboxId], productid: action.productid, unitprice: action.unitprice } };
      return { estimateItemsList: Object.values(estimateItemsAfterProductAndPriceChange), estimateItems: { ...estimateItemsAfterProductAndPriceChange } };
    case CHANGE_ESTIMATE_ITEM_QTY:
      const estimateItemsAfterQtyChange = { ...state.estimateItems, [action.checkboxId]: { ...state.estimateItems[action.checkboxId], quantity: action.quantity } };
      console.log(estimateItemsAfterQtyChange);
      return { estimateItemsList: Object.values(estimateItemsAfterQtyChange), estimateItems: { ...estimateItemsAfterQtyChange } };
    case GET_ESTIMATE_ITEMS:
      return { ...state };
    case CLEAR_ESTIMATE_ITEMS:
      return { estimateItemsList: [], estimateItems: {} };
    default:
      return state;
  }
}

export default estimateItems;