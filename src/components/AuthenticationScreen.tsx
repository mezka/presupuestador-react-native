import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/auth';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';

const AuthenticationScreen = props => {

  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const dispatch = useDispatch();

  const emailTextChange = (emailText) => {
    setUser({ ...user, email: emailText });
  };
  const passwordTextChange = (passwordText) => {
    setUser({ ...user, password: passwordText });
  };

  const handleHidePasswordPress = () => {
    setPasswordHidden(!passwordHidden);
  };

  const inputEmailHasErrors = () => {
    return !(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email));
  };

  const inputPasswordHasErrors = () => {
    return !(/^$|^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/g.test(user.password));
  };

  const handleLoginPress = () => {
    if (!(user.email === '' || user.password === '' || inputEmailHasErrors() || inputPasswordHasErrors())) {
      dispatch(loginUser(user));
    }
  };

  const navigateToSignup = () => {
    RootNavigation.navigate('Signup', {});
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.textInputView}>
        <TextInput mode="flat" label="E-mail" style={styles.textInput} placeholder="nombre@dominio.com" value={user.email} onChangeText={emailTextChange} />
      </View>
      <HelperText type="error" visible={inputEmailHasErrors()}>
        Email inválido
      </HelperText>
      <View style={styles.textInputView}>
        <TextInput mode="flat" label="Contraseña" style={styles.textInput} value={user.password} onChangeText={passwordTextChange} secureTextEntry={passwordHidden} right={<TextInput.Icon name={passwordHidden ? "eye" : "eye-off"} onPress={handleHidePasswordPress} />} />
      </View>
      <HelperText type="error" visible={inputPasswordHasErrors()}>
        Contraseña inválida
      </HelperText>
      <View style={styles.buttonView}>
        <Button mode="contained" onPress={handleLoginPress}>Ingresá</Button>
      </View>
      <View style={styles.buttonView}>
        <Button mode="contained" onPress={navigateToSignup}>Registrate</Button>
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
  textInputView: {
    flexDirection: "row",
    width: 300
  },
  textInput: {
    flex: 1,
  },
  buttonView: {
    justifyContent: 'center',
    width: 200,
    height: 60
  }
});

export default AuthenticationScreen;