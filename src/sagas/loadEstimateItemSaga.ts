import { LOAD_ESTIMATE_ITEM, showEstimateItem } from '../actions/estimateItems';
import { put, takeEvery } from 'redux-saga/effects';

function* loadEstimateItemIntoSelectedEstimate(action) {
  yield put(showEstimateItem(action.productId, action.quantity, action.unitprice));
}

function* loadEstimateItemSaga() {
  yield takeEvery(LOAD_ESTIMATE_ITEM, loadEstimateItemIntoSelectedEstimate);
}

export default loadEstimateItemSaga;