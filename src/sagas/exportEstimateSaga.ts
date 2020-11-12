import { EXPORT_ESTIMATE_REQUESTED, exportEstimatePending, exportEstimateSucceded, exportEstimateFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { downloadEstimate } from '../api/estimates';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from "react-native";

function* attemptExportEstimate(action) {
  const token = yield select((state) => state.auth.token);
  yield put(exportEstimatePending());
  try {
    var { status } = yield call(MediaLibrary.requestPermissionsAsync);
  } catch (error) {
    Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
    return put(exportEstimateFailed(error));
  } finally {
    if (status !== 'granted') {
      Alert.alert("Error", "Media Library permission denied", [{ text: "OK" }], {});
      return put(exportEstimateFailed(new Error('Media Library permission denied')));
    }
  }

  try {
    var downloadResponse = yield call(downloadEstimate, action.estimateId, action.filename, action.mode, token);
  } catch (error) {
    if (!error.response) {
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      return put(exportEstimateFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      return put(exportEstimateFailed(error));
    }
  }

  try {
    var album = yield call(MediaLibrary.getAlbumAsync, 'Mesquita_Hnos');
  } catch (error) {
    Alert.alert("Error", error, [{ text: "OK" }], {});
    return put(exportEstimateFailed(error));
  }

  if (album) {
    try {
      var saveToLibraryResponse = yield call(MediaLibrary.saveToLibraryAsync, downloadResponse.uri)
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK" }], {});
      return put(exportEstimateFailed(error));
    }
  } else {

    try {
      var asset = yield call(MediaLibrary.createAssetAsync, downloadResponse.uri);
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK" }], {});
      return put(exportEstimateFailed(error));
    }

    try {
      var createAlbumResponse = yield call(MediaLibrary.createAlbumAsync, 'Mesquita_Hnos', asset, true)
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK" }], {});
      return put(exportEstimateFailed(error));
    }
  }

  yield put(exportEstimateSucceded());
}

function* exportEstimateSaga() {
  yield takeLatest(EXPORT_ESTIMATE_REQUESTED, attemptExportEstimate);
}

export default exportEstimateSaga;