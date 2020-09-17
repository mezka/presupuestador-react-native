import { LOGIN_USER_REQUESTED, loginUserPending, loginUserFailed, loginUserSucceded } from '../actions/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser as getUser} from '../api/auth';

function* authenticateUser(action){
  yield put(loginUserPending());
  try {
    var response = yield call(getUser, {email: action.user.email, password: action.user.password});
    yield put(loginUserSucceded(response.user, response.accessToken));
  } catch (error){
    yield put (loginUserFailed(error));
  }
}

function* loginUserSaga(){
  yield takeLatest(LOGIN_USER_REQUESTED, authenticateUser);
}

export default loginUserSaga;