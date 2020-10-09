import { LOAD_ESTIMATE_ITEMS, loadEstimateItemWithPrice } from '../actions/estimateItems';
import { put, takeLatest, select } from 'redux-saga/effects';

function* resolveProductPricesAndLoadEstimateItems(action) {

  for(let i = 0; i < action.estimateItems.length; i++){
    const unitprice = yield select(state => state.products.products.find(product => product.id === action.estimateItems[i].product.id).price);

    console.log('unitprice')
    console.log(unitprice)

    yield put(loadEstimateItemWithPrice(action.estimateItems[i].productId, action.estimateItems[i].quantity, unitprice));
  }
}

function* addEstimateItemsSaga() {
  yield takeLatest(LOAD_ESTIMATE_ITEMS, resolveProductPricesAndLoadEstimateItems);
}

export default addEstimateItemsSaga;