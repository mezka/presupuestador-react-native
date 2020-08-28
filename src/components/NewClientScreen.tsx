import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';
import { addClientAndNavigateToPresupuestador } from '../actions/clients';

const NewClientScreen = (props) => {

  const [client, setClient] = useState({name: '', address0: '', email0:'', phonenumber0:''});
  const clients = useSelector(state => state.clients.clients);

  const dispatch = useDispatch();

  const handleSavePress = () => {
    dispatch(addClientAndNavigateToPresupuestador(client));
  };

  const handleNameChange = (text: string) => {
    setClient({...client, name: text});
  };

  const handleAddressChange = (text: string) => {
    setClient({...client, address0: text});
  };

  const handlePhoneChange = (text: string) => {
    setClient({...client, phonenumber0: text});
  };

  const handleEmailChange = (text: string) => {
    setClient({...client, email0: text});
  };

  return (
    <View style={styles.parentView}>
      <Title style={ styles.title }>Ingrese información del cliente</Title>
      
      <View>
        <TextInput style={ styles.textInputView } onChangeText={handleNameChange} mode="flat" label="Nombre" value={client.name}/>
        <TextInput style={ styles.textInputView } onChangeText={handleAddressChange} mode="flat" label="Dirección" value={client.address0}/>
        <TextInput style={ styles.textInputView } onChangeText={handlePhoneChange} mode="flat" label="Telefono" value={client.phonenumber0}/>
        <TextInput style={ styles.textInputView } onChangeText={handleEmailChange} mode="flat" label="Email" value={client.email0}/>
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