export const ADD_ESTIMATE_ITEM_WITH_PRICE = 'ADD_ESTIMATE_ITEM_WITH_PRICE';
export const REMOVE_ESTIMATE_ITEM = 'REMOVE_ESTIMATE_ITEM';
export const CHANGE_ESTIMATE_ITEM_PRODUCT = 'CHANGE_ESTIMATE_ITEM_PRODUCT';
export const CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE = 'CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE';
export const GET_ESTIMATE_ITEMS = 'GET_ESTIMATE_ITEMS';
export const CHANGE_ESTIMATE_ITEM_QTY = 'CHANGE_ESTIMATE';
export const ADD_ESTIMATE_ITEM = 'ADD_ESTIMATE_ITEM';
export const CLEAR_ESTIMATE_ITEMS = 'CLEAR_ESTIMATE_ITEMS';
export const LOAD_ESTIMATE_ITEM_WITH_PRICE = 'LOAD_ESTIMATE_ITEM_WITH_PRICE';
export const LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID = 'LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID';

export const addEstimateItemWithPrice = (productid: number, quantity: number, unitprice: number) => ({
  type: ADD_ESTIMATE_ITEM_WITH_PRICE,
  productid,
  quantity,
  unitprice
});

export const removeEstimateItem = (itemId: number) => ({
  type: REMOVE_ESTIMATE_ITEM,
  itemId
});

export const changeEstimateItemProductWithPrice = (itemId: number, productid: number, unitprice: number) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT_WITH_PRICE,
  itemId,
  productid,
  unitprice
});

export const changeEstimateItemQty = (itemId: number, quantity:number) => ({
  type: CHANGE_ESTIMATE_ITEM_QTY,
  itemId,
  quantity
})

export const addEstimateItem = (productid:number, quantity:number) => ({
  type: ADD_ESTIMATE_ITEM,
  productid,
  quantity
});


export const changeEstimateItemProduct = (itemId: number, productid: number) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT,
  itemId,
  productid
});

export const clearEstimateItems = () => ({
  type: CLEAR_ESTIMATE_ITEMS
});

export const loadEstimateItemWithPrice = (productid: number, quantity: number, unitprice: number) => ({
  type: LOAD_ESTIMATE_ITEM_WITH_PRICE,
  productid,
  quantity,
  unitprice
});

export const loadEstimateItemsByEstimateId = (estimateid) => ({
  type: LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID,
  estimateid
})
