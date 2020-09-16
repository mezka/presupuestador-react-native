import { LOGIN_USER_REQUESTED, loginUserPending, loginUserFailed } from '../actions/users';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUser as getUser} from '../api/users';

function* loginUser(action){

  console.log('loginUser action');
  console.log(action);

  yield put(loginUserPending());
  try {
    var user = yield call(getUser, action.user);
    console.log('loginUser response');
    console.log(user);
  } catch (error){
    yield put (loginUserFailed(error));
  }
}

function* loginUserSaga(){
  yield takeLatest(LOGIN_USER_REQUESTED, loginUser);
}

export default loginUserSaga;