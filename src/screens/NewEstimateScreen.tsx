import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';

const NewEstimateScreen = () => {

  const clients = [
    {
      id: 0,
      name: 'Juan',
      address: 'Alberti 956',
      phonenumber: '1140766551'
    },
    {
      id: 1,
      name: 'Roberto',
      address: 'Azcuenaga 1564',
      phonenumber: '123456123'
    }
  ]

  const [selectedClient, setClient] = useState(clients[0]);

  const clientItems = clients.map((client) => <Picker.Item key={ client.id } label={ client.name } value={ client.id }/>);

  const handlePickerChange = (selectedValue, itemPosition:number) => {
    setClient(clients[itemPosition]);
  }

  return  <View style={ styles.parentView }>
            <View>
              <Button title='Nuevo'/>
              <Picker selectedValue={selectedClient.id} onValueChange={ handlePickerChange }>
                {clientItems}
              </Picker>
            </View>
            <View>
              <Text>Contacto: { selectedClient.name }</Text>
              <Text>Dirección: { selectedClient.address }</Text>
              <Text>Telefono: { selectedClient.phonenumber }</Text>

              <TextInput value={ selectedClient.name }></TextInput>
            </View>
          </View>
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'green',
    marginTop: 100,
    marginHorizontal: 30,
  },
})

export default NewEstimateScreen;
