import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateClient } from '../actions/clients';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText, Appbar, RadioButton } from 'react-native-paper';

const EditClient = (props) => {

  const [client, setClient] = useState(props.route.params.client);
  const [enableCuil, setEnableCuil] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    setClient(props.route.params.client);

  }, [props.route.params.client]);

  const nameTextChange = (name: string) => {
    setClient({...client, name});
  };

  const addressTextChange = (address: string) => {
    setClient({...client, address0: address});
  };

  const phoneNumberTextChange = (phonenumber: string) => {
    setClient({...client, phonenumber0: phonenumber});
  };

  const emailTextChange = (email: string) => {
    setClient({...client, email0: email});
  };

  const cuilTextChange = (cuil: string) => {
    setClient({...client, cuil});
  };

  const toggleEnableCuil = () => {
    setEnableCuil(!enableCuil);
  }

  const inputEmailHasErrors = () => {
    return !(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(client.email0));
  };
  
  const inputCuilHasErrors = () => {
    return !(/^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/.test(client.cuil));
  };

  const handleSavePress = () => {
    if (!client.name || !client.address0 || !client.phonenumber0 || !client.taxcategory || inputEmailHasErrors() || inputCuilHasErrors()) {
      console.log(dispatch(updateClient(client)));
    }
  };

  const handleBackActionPress = () => {
    props.navigation.goBack();
  }

  const handleTaxCategorySelect = (taxcategory: string) => {
    setClient({...client, taxcategory})
  }

  return (
    <View style={ styles.parentView }>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={handleBackActionPress} />
        <Appbar.Content title="Editar Cliente" titleStyle={{alignSelf: 'center'}}></Appbar.Content>
        <Appbar.Action icon="content-save" onPress={handleSavePress} />
      </Appbar.Header>
      <View style={ styles.containerView }>
        <TextInput style={ styles.textInput } mode="flat" label="Nombre" value={client.name} onChangeText={nameTextChange}/>
        <TextInput style={ styles.textInput } mode="flat" label="Dirección" value={client.address0} onChangeText={addressTextChange}/>
        <TextInput style={ styles.textInput } mode="flat" label="Telefono" value={client.phonenumber0} onChangeText={phoneNumberTextChange}/>
        <TextInput style={ styles.textInputWithHelperText } mode="flat" label="Email" value={client.email0} onChangeText={emailTextChange}/>
        <HelperText type="error" visible={inputEmailHasErrors()}>Email inválido</HelperText>
        <TextInput style={ styles.textInputWithHelperText } disabled={!enableCuil || !client.cuil} mode="flat" label="CUIL/CUIT" value={client.cuil} onChangeText={cuilTextChange} right={<TextInput.Icon name={enableCuil?"check-box-outline":"checkbox-blank-outline"} onPress={toggleEnableCuil} />}/>
        <HelperText type="error" visible={enableCuil && inputCuilHasErrors()}>CUIL/CUIT inválido</HelperText>
      </View>

      <RadioButton.Group onValueChange={handleTaxCategorySelect} value={client.taxcategory}>
        <View style={styles.categoriesContainer}>
          <RadioButton.Item disabled={!enableCuil || !client.cuil} label="Consumidor Final" value="CONSUMIDOR FINAL"/>
          <RadioButton.Item disabled={!enableCuil || !client.cuil} label="Monotributo" value="MONOTRIBUTO"/>
          <RadioButton.Item disabled={!enableCuil || !client.cuil} label="Responsable Inscripto" value="RESPONSABLE INSCRIPTO"/>
          <RadioButton.Item disabled={!enableCuil || !client.cuil} label="Exento" value="EXENTO"/>
        </View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerView: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  textInput: {
    marginBottom: 20
  },
  textInputWithHelperText: {
    marginBottom: 0
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});

export default EditClient;
