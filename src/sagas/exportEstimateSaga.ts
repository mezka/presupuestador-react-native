import { EXPORT_ESTIMATE_REQUESTED, exportEstimatePending, exportEstimateSucceded, exportEstimateFailed } from '../actions/estimates';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { downloadEstimate } from '../api/estimates';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Notifications from 'expo-notifications';
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
      var createAlbumResponse = yield call(MediaLibrary.createAlbumAsync, 'Mesquita_Hnos', asset, true);
      console.log(createAlbumResponse);
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK" }], {});
      return put(exportEstimateFailed(error));
    }
  }

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

  yield put(exportEstimateSucceded(action.estimateId, asset.uri));

   try{
    var notification = yield call(Notifications.scheduleNotificationAsync, {content: {title: 'Presupuesto descargado con exito en:', body: asset.uri}, trigger: null });
  } catch (error){
    console.log(error);
  }

  try{
    if(!(yield call(Sharing.isAvailableAsync))){
      Alert.alert("Error", "Sharing is not available in this platform", [{ text: "OK" }], {});
      return put(exportEstimateFailed(new Error('Sharing permission denied')));
    }
    const shareResult = yield call(Sharing.shareAsync, asset.uri, {mimeType: 'application/pdf'});
  } catch (error){
    console.log(error);
  }
}

function* exportEstimateSaga() {
  yield takeLatest(EXPORT_ESTIMATE_REQUESTED, attemptExportEstimate);
}

export default exportEstimateSaga;