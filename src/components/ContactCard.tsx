import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Button, Checkbox } from 'react-native-paper';

const cloneObjectWithEveryPropertySetTo = (src, value) => {

  const reducer = (obj, key) => {
    obj[key] = value;
    return obj;
  };

  return Object.keys(src).reduce(reducer, {});
}

const createFilteredObjUsingSrcAndMapper = (srcObj, mapperObj) => {

  const reducer = (obj, currentTuple) => {

    if(currentTuple[0] === 'name'){
      obj[currentTuple[0]] = srcObj[currentTuple[0]];
    }

    if(currentTuple[1]){
      obj[currentTuple[0]] = srcObj[currentTuple[0]];
    }
    return obj;
  };

  return Object.entries(mapperObj).reduce(reducer, {});
};



const ContactCard = ({contact, importContact}) => {

  const [checkboxes, setCheckboxes] = useState(cloneObjectWithEveryPropertySetTo(contact, false));
  const [toggleAllCheckbox, setToggleAllCheckbox] = useState(false);

  const createCheckboxHandler = (key) => {
    return () => {
      setCheckboxes({ ...checkboxes, [key]: !checkboxes[key]});
    }
  };

  const setAllCheckboxesToThisCheckboxValue = () => {
    setCheckboxes(cloneObjectWithEveryPropertySetTo(checkboxes, !toggleAllCheckbox));
    setToggleAllCheckbox(!toggleAllCheckbox);
  };

  useEffect(() => {
    console.log(contact)
  }, [])

  const createPressHandler = (contact) => {
    return () => {
      importContact(createFilteredObjUsingSrcAndMapper(contact, checkboxes));
    }
  };

  return (
    <Card style={styles.contactCard}>
      <Card.Title style={{marginRight: 16}} title={contact.name} right={(props) => (<Checkbox {...props} status={toggleAllCheckbox? 'checked' : 'unchecked'} onPress={setAllCheckboxesToThisCheckboxValue} />)}/>
      <Card.Content>
        <Title>Telefonos</Title>
      </Card.Content>
      <Checkbox.Item status={checkboxes.phonenumber0? 'checked' : 'unchecked'} onPress={createCheckboxHandler('phonenumber0')} label={contact.phonenumber0}/>
      {contact.phonenumber1 && <Checkbox.Item status={checkboxes.phonenumber1? 'checked' : 'unchecked'} onPress={createCheckboxHandler('phonenumber1')} label={contact.phonenumber1}/>}
      {contact.phonenumber2 && <Checkbox.Item status={checkboxes.phonenumber2? 'checked' : 'unchecked'} onPress={createCheckboxHandler('phonenumber2')} label={contact.phonenumber2}/>}
      <Card.Content>
        <Title>Emails</Title>
      </Card.Content>
      <Checkbox.Item status={checkboxes.email0? 'checked' : 'unchecked'} onPress={createCheckboxHandler('email0')} label={contact.email0}/>
      {contact.email1 && <Checkbox.Item status={checkboxes.email1? 'checked' : 'unchecked'} onPress={createCheckboxHandler('email1')} label={contact.email1}/>}
      {contact.email2 && <Checkbox.Item status={checkboxes.email2? 'checked' : 'unchecked'} onPress={createCheckboxHandler('email2')} label={contact.email2}/>}
      <Card.Content>
        <Title>Direcciones</Title>
      </Card.Content>
      <Checkbox.Item status={checkboxes.address0? 'checked' : 'unchecked'} onPress={createCheckboxHandler('address0')} label={contact.address0}/>
      {contact.address1 && <Checkbox.Item status={checkboxes.address1? 'checked' : 'unchecked'} onPress={createCheckboxHandler('address1')} label={contact.address1}/>}
      {contact.address2 && <Checkbox.Item status={checkboxes.address2? 'checked' : 'unchecked'} onPress={createCheckboxHandler('address2')} label={contact.address0}/>}
      <Card.Actions>
        <Button mode='contained' onPress = {createPressHandler(contact)}>Importar</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    marginTop: 10,
  }
});

export default ContactCard;

