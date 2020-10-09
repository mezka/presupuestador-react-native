export const ADD_ESTIMATE_ITEM_WITH_PRICE = 'ADD_ESTIMATE_ITEM_WITH_PRICE';
export const REMOVE_ESTIMATE_ITEM = 'REMOVE_ESTIMATE_ITEM';
export const CHANGE_ESTIMATE_ITEM_PRODUCT = 'CHANGE_ESTIMATE_ITEM_PRODUCT';
export const CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE = 'CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE';
export const GET_ESTIMATE_ITEMS = 'GET_ESTIMATE_ITEMS';
export const CHANGE_ESTIMATE_ITEM_QTY = 'CHANGE_ESTIMATE';
export const ADD_ESTIMATE_ITEM = 'ADD_ESTIMATE_ITEM';
export const CLEAR_ESTIMATE_ITEMS = 'CLEAR_ESTIMATE_ITEMS';
export const LOAD_ESTIMATE_ITEM = 'LOAD_ESTIMATE_ITEM';
export const SHOW_ESTIMATE_ITEM = 'SHOW_ESTIMATE_ITEM';

export const addEstimateItemWithPrice = (productId: number, quantity: number, price: number) => ({
  type: ADD_ESTIMATE_ITEM_WITH_PRICE,
  productId,
  quantity,
  price
});

export const removeEstimateItem = (itemId: number) => ({
  type: REMOVE_ESTIMATE_ITEM,
  itemId
});

export const changeEstimateItemProductWithPrice = (itemId: number, productId: number, price: number) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE,
  itemId,
  productId,
  price
});

export const changeEstimateItemQty = (itemId: number, quantity:number) => ({
  type: CHANGE_ESTIMATE_ITEM_QTY,
  itemId,
  quantity
})

export const addEstimateItem = (productId:number, quantity:number) => ({
  type: ADD_ESTIMATE_ITEM,
  productId,
  quantity
});

export const changeEstimateItemProduct = (itemId: number, productId: number) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT,
  itemId,
  productId
});

export const clearEstimateItems = () => ({
  type: CLEAR_ESTIMATE_ITEMS
});

export const loadEstimateItem = (productId: number, quantity: number, unitprice: number) => ({
  type: LOAD_ESTIMATE_ITEM,
  productId,
  quantity,
  unitprice
});

export const showEstimateItem = (productId: number, quantity: number, unitprice: number) => ({
  type: SHOW_ESTIMATE_ITEM,
  productId,
  quantity,
  unitprice
});

