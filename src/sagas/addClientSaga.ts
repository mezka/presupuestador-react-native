import { ADD_CLIENT_REQUESTED, addClientPending, getClients, getClientsFailed } from '../actions/clients';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addClient as requestAddClient} from '../api/clients';
import { Alert } from "react-native";

function* addClient(action){
  
  const token = yield select((state) => state.auth.token);
  yield put(addClientPending());
  try {
    var client = yield call(requestAddClient, action.client, token);
    yield put(getClients());
  } catch (error){
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put (getClientsFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put (getClientsFailed(error.response.statusText));
    }
  }
}

function* addClientSaga(){
  yield takeLatest(ADD_CLIENT_REQUESTED, addClient);
}

export default addClientSaga;