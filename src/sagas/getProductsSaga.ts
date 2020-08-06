import { GET_PRODUCTS_REQUESTED, getProductsPending, getProductsSucceded, getProductsFailed } from '../actions/products';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getProducts as fetchProducts } from '../api/products';

function* attemptGetProducts() {
  yield put(getProductsPending());
  try {
    const products = yield call(fetchProducts);
    yield put(getProductsSucceded(products));
  } catch (error) {
    yield put(getProductsFailed(error));
  }
}

function* getProductsSaga() {
  yield takeLatest(GET_PRODUCTS_REQUESTED, attemptGetProducts);
}

export default getProductsSaga;