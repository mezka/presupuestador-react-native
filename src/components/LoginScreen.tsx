import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const LoginScreen = props => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const emailTextChange = (emailText) => {
    setEmailText(emailText);
  };
  const passwordTextChange = (passwordText) => {
    setPasswordText(passwordText);
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.inputView}>
        <TextInput label="e-mail" placeholder="email@example.com" value={emailText} onChange={emailTextChange} />
        <TextInput label="password" value={passwordText} onChange={passwordTextChange} />
      </View>
      <View style={styles.buttonView}>
        <Button mode="contained">Ingresar</Button>
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
    marginTop: 50,
    width: 200,
    height: 100
  }
});

export default LoginScreen;