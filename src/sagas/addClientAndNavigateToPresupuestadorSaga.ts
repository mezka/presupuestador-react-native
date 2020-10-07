import { ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED, getClientsFailed, addClientPending, addClientSucceded } from '../actions/clients';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addClient as postClient} from '../api/clients';
import * as RootNavigation from '../components/RootNavigation';

function* addClientAndNavigateToPresupuestador(action){

  yield put(addClientPending());
  try {
    var client = yield call(postClient, action.client);
    yield put(addClientSucceded(client));
    yield call(RootNavigation.navigate, 'NewEstimate', { client: action.client });
  } catch (error){
    yield put (getClientsFailed(error));
  }
}

function* addClientAndNavigateToPresupuestadorSaga(){
  yield takeLatest(ADD_CLIENT_AND_NAVIGATE_TO_PRESUPUESTADOR_REQUESTED, addClientAndNavigateToPresupuestador);
}

export default addClientAndNavigateToPresupuestadorSaga;