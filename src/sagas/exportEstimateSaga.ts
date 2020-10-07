import { EXPORT_ESTIMATE_REQUESTED, exportEstimatePending, exportEstimateSucceded, exportEstimateFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { downloadEstimate } from '../api/estimates';
import * as MediaLibrary from 'expo-media-library';

function* attemptExportEstimate(action) {
  const token = yield select((state) => state.auth.token);
  yield put(exportEstimatePending());

  try{
    var { status } = yield call(MediaLibrary.requestPermissionsAsync);
  } catch(error){
    return put(exportEstimateFailed(error));
  } finally {
    if(status !== 'granted'){
      return put(exportEstimateFailed({error: new Error('Media Library permission denied')}));
    }  
  }

  try{
    var downloadResponse = yield call(downloadEstimate, action.estimateId, 'pdf');
  } catch (error){
    return put(exportEstimateFailed(error));
  }

  try{
    var saveToLibraryResponse = yield call(MediaLibrary.saveToLibraryAsync, downloadResponse.uri)
  } catch (error){
    return put(exportEstimateFailed(error));
  }
  
  yield put(exportEstimateSucceded());
}

function* exportEstimateSaga() {
  yield takeLatest(EXPORT_ESTIMATE_REQUESTED, attemptExportEstimate);
}

export default exportEstimateSaga;