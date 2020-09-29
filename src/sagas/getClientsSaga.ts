import { GET_CLIENTS_REQUESTED, getClientsPending, getClientsSucceded, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getClients as fetchClients } from '../api/clients';

const getToken = (state) => state.auth.token;

function* attemptGetClients() {
  yield put(getClientsPending());
  try {
    const token = yield select(getToken);
    const clients = yield call(fetchClients, token);
    yield put(getClientsSucceded(clients.data));
  } catch (error) {
    yield put(getClientsFailed(error));
  }
}

function* getClientsSaga() {
  yield takeLatest(GET_CLIENTS_REQUESTED, attemptGetClients);
}

export default getClientsSaga;