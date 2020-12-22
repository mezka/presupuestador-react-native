import { UPDATE_ESTIMATE_AND_EXPORT_REQUESTED, UPDATE_ESTIMATE_PENDING, updateEstimate, exportEstimate } from '../actions/estimates';
import { takeLatest, put, take, select } from 'redux-saga/effects';

function* updateEstimateAndExport(action){

  yield put(updateEstimate(action.estimateId, action.estimate));
  yield take(UPDATE_ESTIMATE_PENDING);

  const resultingAction = yield take();

  console.log(action);

  if(!resultingAction.error){
    const client = yield select(state => state.clients.clients.find(client => client.id === action.estimate.clientid));
    yield put(exportEstimate(action.estimateId, `PRE ${action.estimateId} - ${client.name}.pdf`, 'pdf'));
  }
}

function* updateEstimateAndExportSaga(){
  yield takeLatest(UPDATE_ESTIMATE_AND_EXPORT_REQUESTED, updateEstimateAndExport);
}

export default updateEstimateAndExportSaga;