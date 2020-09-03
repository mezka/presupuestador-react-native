import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactCard from './ContactCard';
import { getContacts } from '../actions/contacts';
import { addClient } from '../actions/clients';

const ContactImporter = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const importContact = (contact) => {
    dispatch(addClient(contact));
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