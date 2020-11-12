import { GET_CATEGORIES_REQUESTED, getCategoriesPending, getCategoriesFailed, getCategoriesSucceded} from '../actions/categories';
import { getCategories as fetchCategories } from '../api/categories';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { productMapper } from '../helpers/productMapper';

function* getCategories(action){
  yield put(getCategoriesPending());
  try{
    var categories = yield call(fetchCategories);
    yield put(getCategoriesSucceded(categories));
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(getCategoriesFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(getCategoriesFailed(error));
    }
  }
}

function* getCategoriesSaga(){
  yield takeLatest(GET_CATEGORIES_REQUESTED, getCategories);
}

export default getCategoriesSaga;


