export const ADD_ESTIMATE_ITEM = 'ADD_ESTIMATE_ITEM';
export const REMOVE_ESTIMATE_ITEM = 'REMOVE_ESTIMATE_ITEM';
export const CHANGE_ESTIMATE_ITEM_PRODUCT = 'CHANGE_ESTIMATE_ITEM_PRODUCT';
export const GET_ESTIMATE_ITEMS = 'GET_ESTIMATE_ITEMS';
export const CHANGE_ESTIMATE_ITEM_QTY = 'CHANGE_ESTIMATE';

export const addEstimateItem = (productId, quantity) => ({
  type: ADD_ESTIMATE_ITEM,
  productId,
  quantity
});

export const removeEstimateItem = itemId => ({
  type: REMOVE_ESTIMATE_ITEM,
  itemId
});

export const changeEstimateItemProduct = (itemId, productId) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT,
  itemId,
  productId
});

export const changeEstimateItemQty = (itemId, quantity) => ({
  type: CHANGE_ESTIMATE_ITEM_QTY,
  itemId,
  quantity
})

