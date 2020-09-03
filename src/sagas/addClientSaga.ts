import { ADD_CLIENT_REQUESTED, addClientPending, getClients, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient as postClient} from '../api/clients';

function* addClient(action){

  console.log('addClient action');
  console.log(action);

  yield put(addClientPending());
  try {
    var client = yield call(postClient, action.client);
    console.log('addClient Response');
    console.log(client);
    yield put(getClients());
  } catch (error){
    yield put (getClientsFailed(error));
  }
}

function* addClientSaga(){
  yield takeLatest(ADD_CLIENT_REQUESTED, addClient);
}

export default addClientSaga;