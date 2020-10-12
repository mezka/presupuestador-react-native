import { LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID, loadEstimateItemWithPrice } from '../actions/estimateItems';
import { put, select, takeLatest } from 'redux-saga/effects';

function* resolveEstimateItemsFromEstimateIdAndLoadThem(action) {

  const estimateitems = yield select(state => state.estimates.estimates.find((estimate) => estimate.id === action.estimateid).estimateitems);

  for(let i = 0; i < estimateitems.length; i++){
    yield put(loadEstimateItemWithPrice(estimateitems[i].productid, estimateitems[i].quantity, estimateitems[i].unitprice));
  }
}

function* loadEstimateItemsByEstimateIdSaga() {
  yield takeLatest(LOAD_ESTIMATE_ITEMS_BY_ESTIMATE_ID, resolveEstimateItemsFromEstimateIdAndLoadThem);
}

export default loadEstimateItemsByEstimateIdSaga;