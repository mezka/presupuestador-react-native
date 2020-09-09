import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactCard from './ContactCard';
import { getContacts } from '../actions/contacts';
import { addClient } from '../actions/clients';

function formatContact(contact){

  console.log('originalContact');
  console.log(contact);


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


  console.log('phonenumberObj');
  console.log(phonenumberObj);


  console.log('formatContact');

  console.log({
      name: contact.name,
      ...phonenumberObj,
      ...emailObj,
      ...addressObj
  });


  return {
    name: contact.name,
    ...phonenumberObj,
    ...emailObj,
    ...addressObj
  };
}


const ContactImporter = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const importContact = (contact) => {
    dispatch(addClient(formatContact(contact)));
  }

  const contactList = contacts.filter((contact) => contact.email0 && contact.phonenumber0 && contact.address0).map(contact => (<ContactCard key={contact.id} importContact={importContact} contact={contact}/>));

  return(
    <ScrollView>
      {contactList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    marginTop: 10,
  }
})

export default ContactImporter;