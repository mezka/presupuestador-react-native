import { GET_CLIENTS_REQUESTED, getClientsPending, getClientsSucceded, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getClients as fetchClients } from '../api/clients';
import { Alert } from "react-native";

function* attemptGetClients() {
  yield put(getClientsPending());
  try {
    const token = yield select((state) => state.auth.token);
    const clients = yield call(fetchClients, token);
    yield put(getClientsSucceded(clients));
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(getClientsFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(getClientsFailed(error));
    }
  }
}

function* getClientsSaga() {
  yield takeLatest(GET_CLIENTS_REQUESTED, attemptGetClients);
}

export default getClientsSaga;