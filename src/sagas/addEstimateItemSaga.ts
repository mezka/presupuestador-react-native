import { ADD_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT, addEstimateItemWithPrice } from '../actions/estimateItems';
import { put, select, takeEvery } from 'redux-saga/effects';

function* resolveProductPriceAndAddEstimateItem(action) {

  const unitprice = yield select(state => state.products.products.find(product => product.id === action.productid).price);

  yield put(addEstimateItemWithPrice(action.productid, action.quantity, unitprice));
}

function* addEstimateItemSaga() {
  yield takeEvery(ADD_ESTIMATE_ITEM_AFTER_RESOLVING_PRODUCT, resolveProductPriceAndAddEstimateItem);
}

export default addEstimateItemSaga;