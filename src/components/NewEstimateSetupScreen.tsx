import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../actions/clients';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Surface, TextInput, Headline, Button, Divider, Title, Subheading, RadioButton, Checkbox, BottomNavigation } from 'react-native-paper';

const NewEstimateSetupScreen = (props) => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState({id: '', name: '', address0: '', email0: '', phonenumber0: '', cuil: ''});
  const [textInputDisabled, setTextInputDisabled] = useState(true);

  useEffect(() => {
    dispatch(getClients());
  }, [])

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

  return  <ScrollView>
            <View style={ styles.parentView }>
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
                <Title>Datos Fiscales</Title>
                <View style={styles.cuilView}>
                  <TextInput style={ styles.cuilInputColumn } mode="flat" disabled={textInputDisabled} label="CUIL/CUIT" value={selectedClient.cuil}/>
                  <Checkbox.Item style={ styles.cuilCheckboxColumn } label="N/A"/>
                </View>
                <Subheading>Categoría</Subheading>
                <View style={styles.categoriesView}>
                  <RadioButton.Group>
                    <View style={styles.categoriesColumn}>
                      <RadioButton.Item label="Responsable Inscripto"/>
                      <RadioButton.Item label="Consumidor Final"/>
                    </View>
                    <View style={styles.categoriesColumn}>
                      <RadioButton.Item label="Responsable Monotributo"/>
                      <RadioButton.Item label="Sujeto Excento"/>
                    </View>
                  </RadioButton.Group>
                </View>
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
            </View>
          </ScrollView>;
};

const styles = StyleSheet.create({
  parentView: {
    marginHorizontal: 30,
    marginTop: 20
  },
  surface: {
    padding: 10,
    elevation: 4,
    marginBottom: 15,
  },
  textInputView: {
    marginBottom: 15
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5
  },
  button: {
    width: 155
  },
  cuilView: {
    flex: 1,
    flexDirection: "row"
  },
  cuilInputColumn: {
    marginBottom: 15,
    flex: 3
  },
  cuilCheckboxColumn: {
    flex: 2
  },
  categoriesView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    textAlign: "right"
  },
  categoriesColumn: {
    flex: 1,
    textAlign: "right"
  }
});

export default NewEstimateSetupScreen;