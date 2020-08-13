import { GET_CLIENTS_REQUESTED, getClientsPending, getClientsSucceded, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getClients as fetchClients } from '../api/clients';

function* attemptGetClients() {
  yield put(getClientsPending());
  try {
    const clients = yield call(fetchClients);
    yield put(getClientsSucceded(clients));
  } catch (error) {
    yield put(getClientsFailed(error));
  }
}

function* getClientsSaga() {
  yield takeLatest(GET_CLIENTS_REQUESTED, attemptGetClients);
}

export default getClientsSaga;