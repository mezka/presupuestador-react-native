import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, updateClient } from '../actions/clients';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Surface, TextInput, Headline, HelperText, Button, Divider, Title, Subheading, RadioButton, Checkbox } from 'react-native-paper';
import { State } from 'react-native-gesture-handler';

const NewEstimateSetupScreen = (props) => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState({id: '', name: '', address0: '', email0: '', phonenumber0: '', cuil: '', taxcategory: '', taxpercent: '21'});
  const [textInputDisabled, setTextInputDisabled] = useState(true);
  const [cuilInputDisabled, setCuilInputDisabled] = useState(true);
  const [radioButtonDisabled, setRadioButtonDisabled] = useState(true);
  const [checkboxDisabled, setCheckboxDisabled] = useState(true);
  const [cuilCheckbox, setCuilCheckbox] = useState(false);

  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    if (clients.length){
      setSelectedClient(clients[0]);
    }
  }, []);

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === Number(selectedValue)));
  };

  const handleEditPress = () => {
    setTextInputDisabled(false);
    setRadioButtonDisabled(false);
    setCheckboxDisabled(false);
    setCuilInputDisabled(cuilCheckbox);
  };

  const handleSavePress = () => {
    if (!textInputDisabled && !(selectedClient.email0==='' || selectedClient.cuil==='' || inputEmailHasErrors() || (inputCuilHasErrors() && !cuilInputDisabled))) {
      setTextInputDisabled(true);
      setRadioButtonDisabled(true);
      setCheckboxDisabled(true);
      setCuilInputDisabled(true);
      dispatch(updateClient(selectedClient));
    }
  };

  const handleCuilCheckboxPress = () => {
    if (!checkboxDisabled) {
      setCuilCheckbox(!cuilCheckbox);
      setCuilInputDisabled(!cuilCheckbox);
      if (!cuilCheckbox) {
        selectedClient.cuil = '';
      }
    }
  };

  const handleChoicePress = () => {
    props.navigation.navigate('NewEstimate', { clientid: selectedClient.id });
  };

  const handleImportPress = () => {
    props.navigation.navigate('ContactImporter');
  };

  const nameTextChange = (nameText) => {
    setSelectedClient({...selectedClient, name: nameText});
  };

  const addressTextChange = (addressText) => {
    setSelectedClient({...selectedClient, address0: addressText});
  };

  const phoneNumberTextChange = (phoneNumberText) => {
    setSelectedClient({...selectedClient, phonenumber0: phoneNumberText});
  };

  const emailTextChange = (emailText) => {
    setSelectedClient({...selectedClient, email0: emailText});
  };

  const cuilTextChange = (cuilText) => {
    setSelectedClient({...selectedClient, cuil: cuilText});
  };

  const handleCategorySelect = (taxCategory) => {
    setSelectedClient({...selectedClient, taxcategory: taxCategory});
  };

  const inputEmailHasErrors = () => {
    return !(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(selectedClient.email0));
  };

  const inputCuilHasErrors = () => {
    return !(/^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/.test(selectedClient.cuil));
  };

return  <ScrollView>
      <View style={ styles.parentView }>
        <Surface style={ styles.surface }>

          <Headline>Seleccione el cliente</Headline>
          <Divider/>
          
          {
          selectedClient &&
          (<View style={ styles.pickerView}>
            <Picker selectedValue={ selectedClient.id } onValueChange={ handlePickerChange }>
              {clients.length ? 
                clients.map((client:any) => <Picker.Item key={ client.id } label={ client.name } value={ client.id }/>)
                : <Picker.Item label="-"/>
              }
            </Picker>
          </View>)
          }
        </Surface>
        <View>
          <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Nombre" value={selectedClient.name} onChangeText={nameTextChange}/>
          <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Dirección" value={selectedClient.address0} onChangeText={addressTextChange}/>
          <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Telefono" value={selectedClient.phonenumber0} onChangeText={phoneNumberTextChange}/>
          <TextInput style={ styles.textInputView } mode="flat" disabled={textInputDisabled} label="Email" value={selectedClient.email0} onChangeText={emailTextChange}/>
          <HelperText type="error" visible={inputEmailHasErrors()}>
            Email inválido
          </HelperText>
          <Title>Datos Fiscales</Title>
          <View style={styles.cuilView}>
            <TextInput style={ styles.cuilInputColumn } mode="flat" disabled={cuilInputDisabled} label="CUIL/CUIT" value={selectedClient.cuil} onChangeText={cuilTextChange}/>
            <Checkbox.Item style={ styles.cuilCheckboxColumn } disabled={checkboxDisabled} label="N/A" status={cuilCheckbox ? 'checked' : 'unchecked'} onPress={handleCuilCheckboxPress}/>
          </View>
          <HelperText type="error" visible={!cuilInputDisabled && inputCuilHasErrors()}>
            CUIL/CUIT inválido
          </HelperText>
          <Subheading>Categoría</Subheading>
          <View style={styles.categoriesView}>
            <RadioButton.Group onValueChange={handleCategorySelect} value={selectedClient.taxcategory}>
              <View style={styles.categoriesColumn}>
                <RadioButton.Item disabled={radioButtonDisabled} label="Consumidor Final" value="CONSUMIDOR FINAL"/>
                <RadioButton.Item disabled={radioButtonDisabled} label="Responsable Inscripto" value="RESPONSABLE INSCRIPTO"/>
              </View>
              <View style={styles.categoriesColumn}>
                <RadioButton.Item disabled={radioButtonDisabled} label="Responsable Monotributo" value="RESPONSABLE MONOTRIBUTO"/>
                <RadioButton.Item disabled={radioButtonDisabled} label="Sujeto Excento" value="SUJETO EXCENTO"/>
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View style={styles.buttonView}>
          <Button style={styles.button} mode="contained" onPress={handleEditPress}>Editar</Button>
          <Button style={styles.button} mode="contained" onPress={handleSavePress}>Guardar</Button>
        </View>

        <View style={styles.buttonView}>
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
    marginVertical: 10
  },
  categoriesColumn: {
    flex: 1
  }
});

export default NewEstimateSetupScreen;