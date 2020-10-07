import { GET_PRODUCTS_REQUESTED, getProductsPending, getProductsSucceded, getProductsFailed } from '../actions/products';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getProducts as fetchProducts } from '../api/products';

const getToken = (state) => state.auth.token;

function* attemptGetProducts() {
  yield put(getProductsPending());
  try {
    const token = yield select(getToken);
    const products = yield call(fetchProducts, token);
    yield put(getProductsSucceded(products));
  } catch (error) {
    yield put(getProductsFailed(error));
  }
}

function* getProductsSaga() {
  yield takeLatest(GET_PRODUCTS_REQUESTED, attemptGetProducts);
}

export default getProductsSaga;