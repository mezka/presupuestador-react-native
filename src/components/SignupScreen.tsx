import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const SignupScreen = props => {

  return (
    <View style={styles.parentView}>
      <View style={styles.inputView}>
        <TextInput label="e-mail" placeholder="email@example.com" />
        <TextInput label="repetir e-mail" placeholder="email@example.com" />
        <TextInput label="password" />
        <TextInput label="repetir password" />
      </View>
      <View style={styles.buttonView}>
        <Button mode="contained">Registrar Usuario</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonView: {
    justifyContent: 'space-around',
    height: 200
  },
  inputView: {
    justifyContent: 'center',
    marginTop: 200,
    marginBottom: 50,
    width: 200,
    height: 100
  }
});

export default SignupScreen;