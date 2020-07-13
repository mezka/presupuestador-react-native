import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../api/clients';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';

const NewEstimateScreen = () => {

  const clients = useSelector(state => state.clientData.clients);
  const [selectedClient, setSelectedClient] = useState(clients[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    setSelectedClient(clients[0]);
  }, [clients])

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === selectedValue));
  }

  const clientItems = clients.map((client:any) => <Picker.Item key={ client.id } label={ client.name } value={ client.id }/>);

  return  <View style={ styles.parentView }>

            <Text>Seleccione el cliente</Text>
            
            {
            selectedClient &&
            <View>
              <Picker selectedValue={ selectedClient.id } onValueChange={ handlePickerChange }>
                {clientItems}
              </Picker>

              <Text>Contacto: { selectedClient.name }</Text>
              <Text>Dirección: { selectedClient.address }</Text>
              <Text>Telefono: { selectedClient.phonenumber }</Text>
            </View>
            }
              
            <Button title='Nuevo Cliente'/>
          </View>;
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'green',
    marginTop: 100,
    marginHorizontal: 30,
  },
})

export default NewEstimateScreen;