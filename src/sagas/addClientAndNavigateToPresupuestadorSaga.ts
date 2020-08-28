import { ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED, getClientsFailed, addClientPending, addClient } from '../actions/clients';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient as postClient} from '../api/clients';
import { navigate } from '../helpers/navigate';

function* addClientAndNavigateToPresupuestador(action){

  console.log('addClientAndNavigatePresupuestador');
  console.log(action.client)

  yield put(addClientPending());
  try {
    var client = yield call(postClient, action.client);

    console.log('clients');
    console.log(client);

    yield put(addClient(client));
    yield call(navigate, 'NewEstimate', { client: action.client });
  } catch (error){
    console.log('error');
    console.log(error);
    yield put (getClientsFailed(error));
  }
}

function* addClientAndNavigateToPresupuestadorSaga(){
  yield takeLatest(ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED, addClientAndNavigateToPresupuestador);
}

export default addClientAndNavigateToPresupuestadorSaga;