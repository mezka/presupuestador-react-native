import { put, takeLatest, take, select } from 'redux-saga/effects';
import { ADD_ESTIMATE_AND_EXPORT_REQUESTED, ADD_ESTIMATE_PENDING, addEstimate, exportEstimate} from '../actions/estimates';

function* addEstimateAndExport(action){
  yield put(addEstimate(action.estimate));
  yield take(ADD_ESTIMATE_PENDING);
  
  const resultingAction = yield take();

  if(!resultingAction.error){
    const estimate = resultingAction.estimate;
    const client = yield select(state => state.clients.clients.find(client => client.id === estimate.clientid));
  
    yield put(exportEstimate(estimate.id, `PRE ${estimate.id} - ${client.name}.pdf`, 'pdf'));
  }
}

function* addEstimateAndExportSaga(){
  yield takeLatest(ADD_ESTIMATE_AND_EXPORT_REQUESTED, addEstimateAndExport);
}

export default addEstimateAndExportSaga;