import { GET_CATEGORIES_REQUESTED, getCategoriesPending, getCategoriesFailed, getCategoriesSucceded} from '../actions/categories';
import { getCategories as fetchCategories } from '../api/categories';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { productMapper } from '../helpers/productMapper';

function* getCategories(action){
  yield put(getCategoriesPending());
  try{
    var categories = yield call(fetchCategories);
  } catch (error) {
    Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
    return yield put(getCategoriesFailed(error));
  }

  yield put(getCategoriesSucceded(categories));
}

function* getCategoriesSaga(){
  yield takeLatest(GET_CATEGORIES_REQUESTED, getCategories);
}

export default getCategoriesSaga;


