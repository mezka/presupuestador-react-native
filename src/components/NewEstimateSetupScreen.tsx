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
  const [cuilInputDisabled, setCuilInputDisabled] = useState(true);
  const [radioButtonDisabled, setRadioButtonDisabled] = useState(true);
  const [checkboxDisabled, setCheckboxDisabled] = useState(true);
  const [category, setCategory] = useState('consumidor-final');
  const [cuilCheckbox, setCuilCheckbox] = useState(false);

  useEffect(() => {
    dispatch(getClients());
  }, [])

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === selectedValue));
  };

  const handleEditPress = () => {
    setTextInputDisabled(false);
    setRadioButtonDisabled(false);
    setCheckboxDisabled(false);
    setCuilInputDisabled(cuilCheckbox);
  };

  const handleSavePress = () => {
    setTextInputDisabled(true);
    setRadioButtonDisabled(true);
    setCheckboxDisabled(true);
    setCuilInputDisabled(true);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
  };

  const handleCuilCheckboxPress = () => {
    if (!checkboxDisabled) {
      setCuilCheckbox(!cuilCheckbox);
      setCuilInputDisabled(!cuilCheckbox);
    }
  }

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
                  <TextInput style={ styles.cuilInputColumn } mode="flat" disabled={cuilInputDisabled} label="CUIL/CUIT" value={selectedClient.cuil}/>
                  <Checkbox.Item style={ styles.cuilCheckboxColumn } disabled={checkboxDisabled} label="N/A" status={cuilCheckbox ? 'checked' : 'unchecked'} onPress={handleCuilCheckboxPress}/>
                </View>
                <Subheading>Categoría</Subheading>
                <View style={styles.categoriesView}>
                  <RadioButton.Group onValueChange={handleCategorySelect} value={category}>
                    <View style={styles.categoriesColumn}>
                      <RadioButton.Item disabled={radioButtonDisabled} label="Responsable Inscripto" value="responsable-inscripto"/>
                      <RadioButton.Item disabled={radioButtonDisabled} label="Consumidor Final" value="consumidor-final"/>
                    </View>
                    <View style={styles.categoriesColumn}>
                      <RadioButton.Item disabled={radioButtonDisabled} label="Responsable Monotributo" value="responsable-monotributo"/>
                      <RadioButton.Item disabled={radioButtonDisabled} label="Sujeto Excento" value="sujeto-excento"/>
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