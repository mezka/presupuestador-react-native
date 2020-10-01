import { ADD_ESTIMATE_REQUESTED, addEstimatePending, addEstimateFailed, addEstimateSucceded, getEstimates } from '../actions/estimates';
import { clearEstimateItems } from '../actions/estimateItems';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addEstimate as newEstimate } from '../api/estimates';
import * as RootNavigation from '../components/RootNavigation';

const getToken = (state) => state.auth.token;

function* addEstimate(action){
  yield put(addEstimatePending());
  try {
    const token = yield select(getToken);
    yield call(newEstimate, action.estimate, token);
    yield put(addEstimateSucceded());
    yield put(getEstimates());
    yield put(clearEstimateItems());
    RootNavigation.goBack();
  } catch (error) {
    console.log(error);
    yield put (addEstimateFailed(error));
  }
}

function* addEstimateSaga(){
  yield takeLatest(ADD_ESTIMATE_REQUESTED, addEstimate);
}

export default addEstimateSaga;