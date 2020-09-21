import { ADD_USER_REQUESTED, addUserPending, addUserFailed, addUserSucceded } from '../actions/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUser as postUser} from '../api/auth';
import * as RootNavigation from '../components/RootNavigation';

function* addUser(action){
  yield put(addUserPending());
  try {
    yield call(postUser, action.user);
    yield put(addUserSucceded());
    RootNavigation.navigate('Authentication', {});
  } catch (error) {
    yield put (addUserFailed(error));
  }
}

function* signupUserSaga(){
  yield takeLatest(ADD_USER_REQUESTED, addUser);
}

export default signupUserSaga;