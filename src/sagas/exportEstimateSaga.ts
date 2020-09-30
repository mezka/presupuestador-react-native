import { EXPORT_ESTIMATE_REQUESTED, exportEstimatePending, exportEstimateSucceded, exportEstimateFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { exportEstimateAsFile as downloadEstimateFile } from '../api/estimates';

const getToken = (state) => state.auth.token;

function* attemptExportEstimate(action) {
  yield put(exportEstimatePending());
  try {
    const token = yield select(getToken);
    const pdf = yield call(downloadEstimateFile, action.estimateId, action.mode, token);
    console.log(pdf);
    yield put(exportEstimateSucceded());
  } catch (error) {
    yield put(exportEstimateFailed(error));
  }
}

function* exportEstimateSaga() {
  yield takeLatest(EXPORT_ESTIMATE_REQUESTED, attemptExportEstimate);
}

export default exportEstimateSaga;