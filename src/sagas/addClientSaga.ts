import { ADD_CLIENT_REQUESTED, getClientsFailed, addClientPending, getClientsSucceded } from '../actions/clients';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient as postClient} from '../api/clients';

function* addClient(action){
  yield put(addClientPending());
  try {
    var client = yield call(postClient, action.client);
    yield put(getClientsSucceded(client));
  } catch (error){
    yield put (getClientsFailed(error));
  }
}

function* addClientSaga(){
  takeLatest(ADD_CLIENT_REQUESTED, addClient);
}

export default addClientSaga;