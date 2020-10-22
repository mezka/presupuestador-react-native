import { UPDATE_CLIENT_REQUESTED, updateClientPending, updateClientSucceded, updateClientFailed, getClients } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { updateClient as requestPutClient } from '../api/clients';
import { Alert } from "react-native";

function* updateClient(action) {
  yield put(updateClientPending());
  try {
    const token = yield select((state) => state.auth.token);
    const putClientResponse = yield call(requestPutClient, action.client, token);
    yield put(updateClientSucceded());
    yield put(getClients());
  } catch (error) {
    Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
    yield put(updateClientFailed(error));
  }
}

function* updateClientSaga() {
  yield takeLatest(UPDATE_CLIENT_REQUESTED, updateClient);
}

export default updateClientSaga;