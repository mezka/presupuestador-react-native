import { CHANGE_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT, changeEstimateItemProductAndPrice } from '../actions/estimateItems';
import { put, select, takeEvery } from 'redux-saga/effects';

function* resolveProductPriceAndChangeEstimateItem(action) {

  const unitprice = yield select(state => state.products.products.find(product => product.id === action.productid).price);

  yield put(changeEstimateItemProductAndPrice(action.itemId, action.productid, unitprice));
}

function* changeEstimateItemSaga() {
  yield takeEvery(CHANGE_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT, resolveProductPriceAndChangeEstimateItem);
}

export default changeEstimateItemSaga;