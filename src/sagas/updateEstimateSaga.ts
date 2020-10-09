import { UPDATE_ESTIMATE_REQUESTED, updateEstimatePending, updateEstimateSucceded, updateEstimateFailed, getEstimates } from '../actions/estimates';
import { clearEstimateItems } from '../actions/estimateItems';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { updateEstimate as putEstimate } from '../api/estimates';
import * as RootNavigation from '../components/RootNavigation';

function* updateEstimate(action) {
  yield put(updateEstimatePending());
  try {
    const token = yield select((state) => state.auth.token);
    const pdf = yield call(putEstimate, action.estimateId, action.estimate, token);
    yield put(updateEstimateSucceded());
    yield put(getEstimates());
    yield put(clearEstimateItems());
    RootNavigation.goBack();
  } catch (error) {
    yield put(updateEstimateFailed(error));
  }
}

function* updateEstimateSaga() {
  yield takeLatest(UPDATE_ESTIMATE_REQUESTED, updateEstimate);
}

export default updateEstimateSaga;