import { LOAD_ESTIMATE_ITEMS, loadEstimateItemWithPrice } from '../actions/estimateItems';
import { put, takeLatest, select } from 'redux-saga/effects';

function* resolveProductPricesAndLoadEstimateItems(action) {
  for(let i = 0; i < action.estimateitems.length; i++){
    const unitprice = yield select(state => state.products.products.find(product => product.id === action.estimateitems[i].productid).price);
    yield put(loadEstimateItemWithPrice(action.estimateitems[i].productid, action.estimateitems[i].quantity, unitprice));
  }
}

function* loadEstimateItemsSaga() {
  yield takeLatest(LOAD_ESTIMATE_ITEMS, resolveProductPricesAndLoadEstimateItems);
}

export default loadEstimateItemsSaga;