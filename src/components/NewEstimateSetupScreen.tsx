import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../api/clients';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Surface, Text, TextInput, Headline, Button, Divider } from 'react-native-paper';

const NewEstimateSetupScreen = (props) => {

  const clients = useSelector(state => state.clientData.clients);
  const [selectedClient, setSelectedClient] = useState({id: '', name: '', address: '', phonenumber: ''});
  const [textInputDisabled, setTextInputDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    if(clients.length){
      setSelectedClient(clients[0]);
    }
  }, [clients])

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === selectedValue));
  }

  const handleEditPress = () => {
    setTextInputDisabled(false);
  }

  const handleSavePress = () => {
    setTextInputDisabled(true);
  }

  const handleChoicePress = () => {
    props.navigation.navigate('NewEstimate');
  }

  const clientItems = clients.map((client:any) => <Picker.Item key={ client.id } label={ client.name } value={ client.id }/>);

  return  <View style={ styles.parentView }>

            <Surface style={ styles.surface }>

              <Headline>Seleccione el cliente</Headline>
              <Divider/>
              
              {
              selectedClient &&
              <View style={ styles.pickerView}>
                <Picker selectedValue={ selectedClient.id } onValueChange={ handlePickerChange }>
                  {clientItems}
                </Picker>
              </View>
              }
            </Surface>
            <View>
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Nombre" value={selectedClient.name}/>
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Dirección" value={selectedClient.address}/>
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Telefono" value={String(selectedClient.phonenumber)}/>
            </View>

            <View style={styles.buttonView}>
              <Button mode="contained" onPress={handleEditPress}>Editar</Button>
              <Button mode="contained" onPress={handleSavePress}>Guardar</Button>
            </View>

            <View style={styles.buttonView}>
              <Button mode="contained">Nuevo Cliente</Button>
              <Button mode="contained" onPress={handleChoicePress}>Elegir</Button>
            </View>
          </View>;
};

const styles = StyleSheet.create({
  parentView: {
    marginTop: 100,
    marginHorizontal: 30,
  },
  surface: {
    padding: 10,
    elevation: 4,
    marginBottom: 20,
  },
  textInputView: {
    marginBottom: 20,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})

export default NewEstimateSetupScreen;