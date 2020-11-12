import * as Contacts from 'expo-contacts';
import { GET_CONTACTS_REQUESTED, getContactsPending, getContactsSucceded, getContactsFailed } from '../actions/contacts';
import { call, put, takeLatest } from 'redux-saga/effects';
import contactFormatter from '../helpers/contactFormatter';
import { Alert } from "react-native";

function* attemptGetContacts() {
  
  yield put(getContactsPending());
  
  try {
    var { status } = yield call(Contacts.requestPermissionsAsync);
  } catch (error) {
    Alert.alert("Error", error, [{ text: "OK" }], {});
    yield put(getContactsFailed(error));
    return;
  } finally {
      if(status !== 'granted'){
        Alert.alert("Error", 'Unable to get contact', [{ text: "OK" }], {});
        put(getContactsFailed({status}));
        return;
      }
  }

  try {
    var { data } = yield call(Contacts.getContactsAsync, { fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Addresses] });
    yield put(getContactsSucceded(contactFormatter(data)));
  } catch (error) {
    if(!error.response){
      Alert.alert("Error", "Request timeout", [{ text: "OK" }], {});
      yield put(getContactsFailed("Request timeout"));
    } else {
      Alert.alert("Error", error.response.statusText, [{ text: "OK" }], {});
      yield put(getContactsFailed(error));
    }
  }
}

function* getContactsSaga() {
  yield takeLatest(GET_CONTACTS_REQUESTED, attemptGetContacts);
}

export default getContactsSaga;