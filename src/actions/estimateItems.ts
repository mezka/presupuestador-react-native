export const ADD_ESTIMATE_ITEM_WITH_PRICE = 'ADD_ESTIMATE_ITEM_WITH_PRICE';
export const REMOVE_ESTIMATE_ITEM = 'REMOVE_ESTIMATE_ITEM';
export const CHANGE_ESTIMATE_ITEM_PRODUCT_AND_PRICE = 'CHANGE_ESTIMATE_ITEM_PRODUCT_AND_PRICE';
export const CHANGE_ESTIMATE_ITEM_QTY = 'CHANGE_ESTIMATE_ITEM_QTY';
export const GET_ESTIMATE_ITEMS = 'GET_ESTIMATE_ITEMS';
export const CLEAR_ESTIMATE_ITEMS = 'CLEAR_ESTIMATE_ITEMS';
export const LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID = 'LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID';
export const ADD_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT = 'ADD_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT';
export const CHANGE_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT = 'CHANGE_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT';


export const addEstimateItemWithPrice = (productid: number, quantity: number, unitprice: number) => ({
  type: ADD_ESTIMATE_ITEM_WITH_PRICE,
  productid,
  quantity,
  unitprice
});


export const removeEstimateItem = (checkboxId: number) => ({
  type: REMOVE_ESTIMATE_ITEM,
  checkboxId
})

export const changeEstimateItemProductAndPrice = (checkboxId: number, productid: number, unitprice: number) => ({
  type: CHANGE_ESTIMATE_ITEM_PRODUCT_AND_PRICE,
  checkboxId,
  productid,
  unitprice
});

export const changeEstimateItemQty = (checkboxId: number, quantity:number) => ({
  type: CHANGE_ESTIMATE_ITEM_QTY,
  checkboxId,
  quantity
})

export const addEstimateItemAfterResolvingProduct = (productid:number, quantity:number) => ({
  type: ADD_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT,
  productid,
  quantity
});

export const changeEstimateItemAfterResolvingProduct = (itemId: number, productid: number) => ({
  type: CHANGE_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT,
  itemId,
  productid
});

export const clearEstimateItems = () => ({
  type: CLEAR_ESTIMATE_ITEMS
});

export const loadEstimateItemsByEstimateId = (estimateid: number) => ({
  type: LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID,
  estimateid
})
