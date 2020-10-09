import { CHANGE_ESTIMATE_ITEM_PRODUCT, changeEstimateItemProductWithPrice } from '../actions/estimateItems';
import { put, select, takeEvery } from 'redux-saga/effects';

function* resolveProductPriceAndChangeEstimateItem(action) {

  const price = yield select(state => state.products.products.find(product => product.id === action.productid).price);

  yield put(changeEstimateItemProductWithPrice(action.itemId, action.productid, price));
}

function* changeEstimateItemSaga() {
  yield takeEvery(CHANGE_ESTIMATE_ITEM_PRODUCT, resolveProductPriceAndChangeEstimateItem);
}

export default changeEstimateItemSaga;