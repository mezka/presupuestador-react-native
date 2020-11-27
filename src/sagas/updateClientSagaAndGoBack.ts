import { UPDATE_CLIENT_REQUESTED, updateClientPending, updateClientSucceded, updateClientFailed, getClients } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { updateClient as requestPutClient } from '../api/clients';
import * as RootNavigation from '../components/RootNavigation';
import { Alert } from "react-native";

function* updateClientAndGoBack(action) {
  yield put(updateClientPending());
  try {
    const token = yield select((state) => state.auth.token);
    const putClientResponse = yield call(requestPutClient, action.client, token);
    yield put(updateClientSucceded());
    yield put(getClients());
    yield call(RootNavigation.goBack);
  } catch (error) {
    if (!error.response) {
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(updateClientFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(updateClientFailed(error));
    }
  }
}

function* updateClientSagaAndGoBack() {
  yield takeLatest(UPDATE_CLIENT_REQUESTED, updateClientAndGoBack);
}

export default updateClientSagaAndGoBack;