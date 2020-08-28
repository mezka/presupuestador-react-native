import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../actions/clients';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Surface, TextInput, Headline, Button, Divider } from 'react-native-paper';

const NewEstimateSetupScreen = (props) => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState({id: '', name: '', address0: '', email0: '', phonenumber0: ''});
  const [textInputDisabled, setTextInputDisabled] = useState(true);

  useEffect(() => {
    dispatch(getClients());
  }, [])

  useEffect(() => {
    console.log(clients);
  }, [clients])

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === selectedValue));
  };

  const handleEditPress = () => {
    setTextInputDisabled(false);
  };

  const handleSavePress = () => {
    setTextInputDisabled(true);
  };

  const handleNewPress = () => {
    props.navigation.navigate('NewClient');
  };

  const handleChoicePress = () => {
    props.navigation.navigate('NewEstimate', { client: selectedClient });
  };

  const handleImportPress = () => {
    props.navigation.navigate('ContactImporter');
  };

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
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Dirección" value={selectedClient.address0}/>
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Telefono" value={selectedClient.phonenumber0}/>
              <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Email" value={selectedClient.email0}/>
            </View>

            <View style={styles.buttonView}>
              <Button style={styles.button} mode="contained" onPress={handleEditPress}>Editar</Button>
              <Button style={styles.button} mode="contained" onPress={handleSavePress}>Guardar</Button>
            </View>

            <View style={styles.buttonView}>
              <Button style={styles.button} mode="contained" onPress={handleNewPress}>Nuevo Cliente</Button>
              <Button style={styles.button} mode="contained" onPress={handleImportPress}>Importar</Button>
              <Button style={styles.button} mode="contained" onPress={handleChoicePress}>Elegir</Button>
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
    justifyContent: "space-around",
    marginVertical: 5
  },
  button: {
    width: 155,
  }
});

export default NewEstimateSetupScreen;