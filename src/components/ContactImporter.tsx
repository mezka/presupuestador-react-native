import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Paragraph, Title, Button } from 'react-native-paper';
import * as Contacts from 'expo-contacts';

const ContactImporter = () => {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if(status === 'granted') {
      var { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Addresses],
      });
    }

    console.log(data);

    if(data.length){
      setContacts(data);
    }
  };

  useEffect(() => {
    getContacts();
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