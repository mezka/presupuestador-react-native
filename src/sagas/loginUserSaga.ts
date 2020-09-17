import { LOGIN_USER_REQUESTED, loginUserPending, loginUserFailed } from '../actions/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser as getUser} from '../api/auth';

function* authenticateUser(action){

  console.log('loginUser action');
  console.log(action);

  yield put(loginUserPending());
  try {
    var user = yield call(getUser, {email: action.user.email, password: action.user.password});
    console.log('loginUser response');
    console.log(user);
  } catch (error){
    yield put (loginUserFailed(error));
  }
}

function* loginUserSaga(){
  yield takeLatest(LOGIN_USER_REQUESTED, authenticateUser);
}

export default loginUserSaga;