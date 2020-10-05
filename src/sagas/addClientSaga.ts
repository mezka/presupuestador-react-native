import { ADD_CLIENT_REQUESTED, addClientPending, getClients, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addClient as requestAddClient} from '../api/clients';

function* addClient(action){

  const token = yield select((state) => state.auth.token);

  console.log('addClient action');
  console.log(action);

  yield put(addClientPending());
  try {
    var client = yield call(requestAddClient, action.client, token);

    console.log(client);

    yield put(getClients());
  } catch (error){
    console.log(error);
    yield put (getClientsFailed(error));
  }
}

function* addClientSaga(){
  yield takeLatest(ADD_CLIENT_REQUESTED, addClient);
}

export default addClientSaga;