import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/auth';
import { View, StyleSheet, Text } from 'react-native';
import { Button, IconButton, HelperText, TextInput } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';

const AuthenticationScreen = props => {

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const [passwordHidden, setPasswordHidden] = useState(true);
  const dispatch = useDispatch();

  const emailTextChange = (emailText) => {
    setUser({...user, email: emailText});
  };
  const passwordTextChange = (passwordText) => {
    setUser({...user, password: passwordText});
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
    if (!(user.email==='' || user.password==='' || inputEmailHasErrors() || inputPasswordHasErrors())) {
      dispatch(loginUser(user));
    }
  };
  
  const navigateToSignup = () => {
    RootNavigation.navigate('Signup', {});
  };
  
  return (
    <View style={styles.parentView}>
      <View style={styles.loginView}>
        <View>
          <TextInput mode="flat" label="E-mail" placeholder="nombre@dominio.com" value={user.email} onChangeText={emailTextChange} />
          <HelperText type="error" visible={inputEmailHasErrors()}>
            Email inválido
          </HelperText>
          <View style={styles.passwordView}>
            <TextInput mode="flat" label="Contraseña" style={{flex: 0.9}} value={user.password} onChangeText={passwordTextChange} secureTextEntry={passwordHidden} />
            <IconButton icon={passwordHidden?"eye":"eye-off"} style={{flex: 0.1}} size={20} onPress={handleHidePasswordPress} />
          </View>
          <HelperText type="error" visible={inputPasswordHasErrors()}>
            Contraseña inválida
          </HelperText>
        </View>
        <View style={styles.buttonView}>
          <Button mode="contained" onPress={handleLoginPress}>Ingresá</Button>
        </View>
      </View>
      <View style={styles.signupView}>
        <Text style={styles.text}>...o si no tenés cuenta</Text>
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
  buttonView: {
    justifyContent: 'space-around',
    height: 50
  },
  inputView: {
    justifyContent: 'center',
    marginTop: 50,
    width: 200,
    height: 100
  },
  loginView: {
    justifyContent: 'center',
    marginTop: 50,
    width: 200,
    height: 100
  },
  passwordView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    width: 235
  },
  signupView: {
    justifyContent: 'center',
    marginTop: 50,
    width: 200,
    height: 100
  },
  text: {
    fontSize: 17
  }
});

export default AuthenticationScreen;