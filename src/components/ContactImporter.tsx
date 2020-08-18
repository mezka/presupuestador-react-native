import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, Title, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../actions/contacts';

const ContactImporter = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  
const contactList = contacts.filter((contact) => contact.emails && contact.phoneNumbers && contact.addresses).map(contact => (
  <Card style={styles.contactCard} key={contact.id}>
    <Card.Title title={contact.name}/>
    <Card.Content>
      <Title>Telefonos</Title>
      {contact.phoneNumbers.map(phoneNumber => (<Paragraph key={phoneNumber.id}>{phoneNumber.number}</Paragraph>))}
      <Title>Emails</Title>
      {contact.emails.map(email => (<Paragraph key={email.id}>{email.email}</Paragraph>))}
      <Title>Direcciones</Title>
      {contact.addresses.map(address => (<Paragraph key={address.id}>{address.formattedAddress}</Paragraph>))}
    </Card.Content>
    <Card.Actions>
      <Button>Importar</Button>
    </Card.Actions>
  </Card>
  )
);

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