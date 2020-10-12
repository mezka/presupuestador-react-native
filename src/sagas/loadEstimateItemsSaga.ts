import { LOAD_ESTIMATE_ITEMS, loadEstimateItemWithPrice } from '../actions/estimateItems';
import { put, takeLatest } from 'redux-saga/effects';

function* resolveProductPricesAndLoadEstimateItems(action) {
  for(let i = 0; i < action.estimateitems.length; i++){
    yield put(loadEstimateItemWithPrice(action.estimateitems[i].productid, action.estimateitems[i].quantity, action.estimateitems[i].unitprice));
  }
}

function* loadEstimateItemsSaga() {
  yield takeLatest(LOAD_ESTIMATE_ITEMS, resolveProductPricesAndLoadEstimateItems);
}

export default loadEstimateItemsSaga;