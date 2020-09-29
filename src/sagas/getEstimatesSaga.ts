import { GET_ESTIMATES_REQUESTED, getEstimatesPending, getEstimatesSucceded, getEstimatesFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getEstimates as fetchEstimates } from '../api/estimates';

const getToken = (state) => state.auth.token;

function* attemptGetEstimates() {
  yield put(getEstimatesPending());
  try {
    const token = yield select(getToken);
    const estimates = yield call(fetchEstimates, token);
    yield put(getEstimatesSucceded(estimates.data));
  } catch (error) {
    yield put(getEstimatesFailed(error));
  }
}

function* getEstimatesSaga() {
  yield takeLatest(GET_ESTIMATES_REQUESTED, attemptGetEstimates);
}

export default getEstimatesSaga;