import { ADD_ESTIMATE_REQUESTED, addEstimatePending, addEstimateFailed, addEstimateSucceded, getEstimates } from '../actions/estimates';
import { clearEstimateItems } from '../actions/estimateItems';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addEstimate as newEstimate } from '../api/estimates';
import * as RootNavigation from '../components/RootNavigation';
import { Alert } from "react-native";

const getToken = (state) => state.auth.token;

function* addEstimate(action){
  yield put(addEstimatePending());
  try {
    const token = yield select(getToken);
    const estimate = yield call(newEstimate, action.estimate, token);
    yield put(addEstimateSucceded(estimate));
    yield put(getEstimates());
    yield put(clearEstimateItems());
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(addEstimateFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(addEstimateFailed(error.response.statusText));
    }
  }
}

function* addEstimateSaga(){
  yield takeLatest(ADD_ESTIMATE_REQUESTED, addEstimate);
}

export default addEstimateSaga;