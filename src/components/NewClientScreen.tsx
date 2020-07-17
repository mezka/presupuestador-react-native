import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';
import { addClient as requestAddClient } from '../api/clients';
import { useMutation } from 'react-query';
import log from 'loglevel';

const NewClientScreen = (props) => {

  const [client, setClient] = useState({name: '', address: '', email:'', phonenumber:''});

  const [addClient] = useMutation(requestAddClient, {
    onSuccess: (data, variables) => {
      log.info(`Successful post to /clients returning:\n${JSON.stringify(data)}`);
      props.navigation.navigate('NewEstimate', { client: data });
    },
    onError: (error) => {
      log.error(error);
    }
  })

  const handleSavePress = () => {
    addClient(client);
  }

  const handleNameChange = (text: string) => {
    setClient({...client, name: text});
  };

  const handleAddressChange = (text: string) => {
    setClient({...client, address: text});
  };

  const handlePhoneChange = (text: string) => {
    setClient({...client, phonenumber: text});
  };

  const handleEmailChange = (text: string) => {
    setClient({...client, email: text});
  };

  return (
    <View style={styles.parentView}>
      <Title style={ styles.title }>Ingrese información del cliente</Title>
      
      <View>
        <TextInput style={ styles.textInputView } onChangeText={handleNameChange} mode="flat" label="Nombre" value={client.name}/>
        <TextInput style={ styles.textInputView } onChangeText={handleAddressChange} mode="flat" label="Dirección" value={client.address}/>
        <TextInput style={ styles.textInputView } onChangeText={handlePhoneChange} mode="flat" label="Telefono" value={client.phonenumber}/>
        <TextInput style={ styles.textInputView } onChangeText={handleEmailChange} mode="flat" label="Email" value={client.email}/>
      </View>

      <View>
        <Button mode="contained" onPress={handleSavePress}>Guardar</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentView: {
  },
  title: {
    textAlign: 'center',
  }
})


export default NewClientScreen;