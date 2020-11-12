import { UPDATE_ESTIMATE_REQUESTED, updateEstimatePending, updateEstimateSucceded, updateEstimateFailed, getEstimates } from '../actions/estimates';
import { clearEstimateItems } from '../actions/estimateItems';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { updateEstimate as requestPutEstimate } from '../api/estimates';
import * as RootNavigation from '../components/RootNavigation';
import { Alert } from "react-native";

function* updateEstimate(action) {
  yield put(updateEstimatePending());
  try {
    const token = yield select((state) => state.auth.token);
    const putEstimateResponse = yield call(requestPutEstimate, action.estimateId, action.estimate, token);
    yield put(updateEstimateSucceded());
    yield put(getEstimates());
    yield put(clearEstimateItems());
    RootNavigation.goBack();
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(updateEstimateFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(updateEstimateFailed(error));
    }
  }
}

function* updateEstimateSaga() {
  yield takeLatest(UPDATE_ESTIMATE_REQUESTED, updateEstimate);
}

export default updateEstimateSaga;