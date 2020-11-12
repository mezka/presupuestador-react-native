import { ADD_USER_REQUESTED, addUserPending, addUserFailed, addUserSucceded } from '../actions/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUser as postUser } from '../api/auth';
import * as RootNavigation from '../components/RootNavigation';
import { Alert } from "react-native";

function* addUser(action){
  yield put(addUserPending());
  try {
    yield call(postUser, action.user);
    yield put(addUserSucceded());
    Alert.alert(action.user.name, "¡Usuario creado con éxito!", [{ text: "OK" }], {});
    RootNavigation.navigate('Authentication', {});
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put (addUserFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put (addUserFailed(error));
    }
  }
}

function* signupUserSaga(){
  yield takeLatest(ADD_USER_REQUESTED, addUser);
}

export default signupUserSaga;