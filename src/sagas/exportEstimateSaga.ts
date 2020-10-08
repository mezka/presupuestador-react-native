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
    var downloadResponse = yield call(downloadEstimate, action.estimateId, action.filename, action.mode, token);
  } catch (error){
    return put(exportEstimateFailed(error));
  }

  try{
    var album = yield call (MediaLibrary.getAlbumAsync, 'Mesquita_Hnos');
  } catch (error){
    return put(exportEstimateFailed(error));
  }

  if(album){
    try{
      var saveToLibraryResponse = yield call(MediaLibrary.saveToLibraryAsync, downloadResponse.uri)
    } catch (error){
      return put(exportEstimateFailed(error));
    }
  } else {

    try {
      var asset = yield call(MediaLibrary.createAssetAsync, downloadResponse.uri);
    } catch (error){
      return put(exportEstimateFailed(error));
    }

    try {
      var createAlbumResponse = yield call(MediaLibrary.createAlbumAsync, 'Mesquita_Hnos', asset, true)
    } catch (error){
      return put(exportEstimateFailed(error));
    }
  }

  yield put(exportEstimateSucceded());
}

function* exportEstimateSaga() {
  yield takeLatest(EXPORT_ESTIMATE_REQUESTED, attemptExportEstimate);
}

export default exportEstimateSaga;