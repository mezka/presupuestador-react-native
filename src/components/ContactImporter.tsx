import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Searchbar, Text } from 'react-native-paper';
import ContactCard from './ContactCard';
import { getContacts, setContactsFilter, setContactsSearchAndFilter } from '../actions/contacts';
import { addClient } from '../actions/clients';

function formatContact(contact){

  const phonenumbers = [contact.phonenumber0, contact.phonenumber1, contact.phonenumber2].filter((phonenumber) => phonenumber);
  const emails = [contact.email0, contact.email1, contact.email2].filter((email) => email);
  const addresses = [contact.address0, contact.address1, contact.address2].filter((address) => address);

  const phonenumberObj = Object.values(phonenumbers).reduce((obj, currentPhonenumber, index) => {
    obj[`phonenumber${index}`] = currentPhonenumber;
    return obj;
  }, {});

  const emailObj = Object.values(emails).reduce((obj, currentEmail, index) => {
    obj[`email${index}`] = currentEmail;
    return obj;
  }, {});

  const addressObj = Object.values(addresses).reduce((obj, currentAddress, index) => {
    obj[`address${index}`] = currentAddress;
    return obj;
  }, {});

  return {
    name: contact.name,
    ...phonenumberObj,
    ...emailObj,
    ...addressObj
  };
}


const ContactImporter = () => {

  const dispatch = useDispatch();
  const filteredContacts = useSelector(state => state.contacts.filteredContacts);
  const [searchContactQuery, setSearchContactQuery] = useState('');

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const importContact = (contact) => {
    dispatch(addClient(formatContact(contact)));
  }

  const onChangeContactSearch = (queryString) => {
    if(queryString.length < searchContactQuery.length){
      dispatch(setContactsFilter((contact) => true));
    } else {
      dispatch(setContactsSearchAndFilter(queryString, (contact) => true));
    }
    setSearchContactQuery(queryString);
  };

  const listContacts = () => {
    if (filteredContacts) {
      return filteredContacts.map(contact => (<ContactCard key={contact.id} importContact={importContact} contact={contact}/>));
    } else {
      return <Text>Vacío</Text>;
    }
  };

  return(
    <ScrollView>
      <Searchbar placeholder="Buscar" onChangeText={onChangeContactSearch} value={searchContactQuery}/>
      {listContacts()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    marginTop: 10,
  }
})

export default ContactImporter;