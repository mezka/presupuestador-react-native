import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients } from '../actions/clients';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Surface, TextInput, FAB, List, Appbar } from 'react-native-paper';

const NewEstimateSetupScreen = (props) => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState({ id: '', name: '', address0: '', email0: '', phonenumber0: '', cuil: '', taxcategory: '', taxpercent: '21' });


  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    if (clients.length) {
      setSelectedClient(clients[0]);
    }
  }, []);

  const handlePickerChange = (selectedValue) => {
    setSelectedClient(clients.find(client => client.id === Number(selectedValue)));
  };

  const handleEditPress = () => {
    props.navigation.navigate('EditClient', { client: selectedClient });
  }

  const handleChoicePress = () => {
    props.navigation.navigate('NewEstimate', { clientid: selectedClient.id });
  };

  const handleImportPress = () => {
    props.navigation.navigate('ContactImporter');
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.containerView}>
        <Surface style={styles.surface}>
          {
            selectedClient &&
            (<View style={styles.pickerView}>
              <Picker selectedValue={selectedClient.id} onValueChange={handlePickerChange}>
                {clients.length ?
                  clients.map((client: any) => <Picker.Item key={client.id} label={client.name} value={client.id} />)
                  : <Picker.Item label="-" />
                }
              </Picker>
            </View>)
          }
        </Surface>
        <TextInput style={styles.textInput} mode="flat" disabled={true} label="Dirección" value={selectedClient.address0} />
        <TextInput style={styles.textInput} mode="flat" disabled={true} label="Telefono" value={selectedClient.phonenumber0} />
        <TextInput style={styles.textInput} mode="flat" disabled={true} label="Email" value={selectedClient.email0} />
        <TextInput style={styles.textInput} mode="flat" disabled={true} label="CUIL/CUIT" value={selectedClient.cuil} />

        <List.Section>
          <List.Subheader>Categoría fiscal</List.Subheader>
          {
            selectedClient.taxcategory?
            <List.Item title={selectedClient.taxcategory} left={() => <List.Icon color="#000" icon="layoers-outline" />} />:
            <List.Item title="No ingresado" left={() => <List.Icon icon="layers-off-outline" />} />
          }
        </List.Section>
        <FAB style={styles.chooseButton} icon="arrow-right" onPress={handleChoicePress} />
      </View>
      <Appbar style={styles.appbar}>
          <Appbar.Action icon="pencil-outline" onPress={handleEditPress}/>
          <Appbar.Action icon="account-arrow-left" onPress={handleImportPress} />
        </Appbar>
    </View>
  );
}
const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  containerView: {
    marginHorizontal: 5,
    marginTop: 45,
    flex: 1
  },
  surface: {
    padding: 5,
    elevation: 4,
    marginBottom: 15,
  },
  textInput: {
    marginBottom: 15
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView:{
    alignItems: 'center'
  },
  chooseButton: {
    position: 'absolute',
    right: 5,
    bottom: 70,
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12
  },
});

export default NewEstimateSetupScreen;