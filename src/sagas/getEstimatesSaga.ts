import { GET_ESTIMATES_REQUESTED, getEstimatesPending, getEstimatesSucceded, getEstimatesFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getEstimates as fetchEstimates } from '../api/estimates';
import { Alert } from "react-native";

const getToken = (state) => state.auth.token;

function* attemptGetEstimates() {
  yield put(getEstimatesPending());
  try {
    const token = yield select(getToken);
    const estimates = yield call(fetchEstimates, token);
    
    yield put(getEstimatesSucceded(estimates));
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(getEstimatesFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(getEstimatesFailed(error));
    }
  }
}

function* getEstimatesSaga() {
  yield takeLatest(GET_ESTIMATES_REQUESTED, attemptGetEstimates);
}

export default getEstimatesSaga;