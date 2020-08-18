import * as Contacts from 'expo-contacts';
import { GET_CONTACTS_REQUESTED, getContactsPending, getContactsSucceded, getContactsFailed } from '../actions/contacts';
import { call, put, takeLatest } from 'redux-saga/effects';

function* attemptGetContacts() {

  yield put(getContactsPending());

  try {
    var { status } = yield call(Contacts.requestPermissionsAsync);
  } catch (error) {
    yield put(getContactsFailed(error));
    return;
  } finally {
      if(status !== 'granted'){
        put(getContactsFailed({status}));
        return
      }
  }
  
  try {
    var { data } = yield call(Contacts.getContactsAsync, { fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Addresses] });

    console.log(data);

    yield put(getContactsSucceded(data));
  } catch (error) {
    yield put(getContactsFailed(error));
  }
}

function* getContactsSaga() {
  yield takeLatest(GET_CONTACTS_REQUESTED, attemptGetContacts);
}

export default getContactsSaga;