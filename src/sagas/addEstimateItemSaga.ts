import { ADD_ESTIMATE_ITEM, addEstimateItemWithPrice } from '../actions/estimateItems';
import { put, select, takeEvery } from 'redux-saga/effects';

function* resolveProductPriceAndAddEstimateItem(action) {

  const price = yield select(state => state.products.products.find(product => product.id === action.productId).price);

  yield put(addEstimateItemWithPrice(action.productId, action.quantity, price));
}

function* addEstimateItemSaga() {
  yield takeEvery(ADD_ESTIMATE_ITEM, resolveProductPriceAndAddEstimateItem);
}

export default addEstimateItemSaga;