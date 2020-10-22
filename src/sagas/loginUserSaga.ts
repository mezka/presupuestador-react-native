import { LOGIN_USER_REQUESTED, loginUserPending, loginUserFailed, loginUserSucceded } from '../actions/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser as fetchClient} from '../api/auth';
import * as RootNavigation from '../components/RootNavigation';
import { Alert } from "react-native";

function* authenticateUser(action){
  yield put(loginUserPending());
  try {
    let response = yield call(fetchClient, {email: action.user.email, password: action.user.password});
    RootNavigation.navigate('Home', {});
    yield put(loginUserSucceded(response.user, response.accessToken));
  } catch (error){
    Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
    yield put (loginUserFailed(error.response.statusText));
  }
}

function* loginUserSaga(){
  yield takeLatest(LOGIN_USER_REQUESTED, authenticateUser);
}

export default loginUserSaga;