import { ADD_USER_REQUESTED, addUserPending, addUserFailed } from '../actions/users';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUser as postUser} from '../api/users';

function* addUser(action){

  console.log('addUser action');
  console.log(action);

  yield put(addUserPending());
  try {
    var user = yield call(postUser, action.user);
    console.log('addUser response');
    console.log(user);
  } catch (error){
    yield put (addUserFailed(error));
  }
}

function* signupUserSaga(){
  yield takeLatest(ADD_USER_REQUESTED, addUser);
}

export default signupUserSaga;