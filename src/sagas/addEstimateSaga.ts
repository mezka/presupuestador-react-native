import { ADD_ESTIMATE_REQUESTED, addEstimatePending, addEstimateFailed, addEstimateSucceded } from '../actions/estimates';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addEstimate as newEstimate } from '../api/estimates';
import * as RootNavigation from '../components/RootNavigation';

function* addEstimate(action){
  yield put(addEstimatePending());
  try {
    yield call(newEstimate, action.estimate);
    yield put(addEstimateSucceded());
    RootNavigation.navigate('NewEstimateSetup', {});
  } catch (error) {
    yield put (addEstimateFailed(error));
  }
}

function* addEstimateSaga(){
  yield takeLatest(ADD_ESTIMATE_REQUESTED, addEstimate);
}

export default addEstimateSaga;