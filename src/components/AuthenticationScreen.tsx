import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/auth';
import { View, StyleSheet, Text } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';

const AuthenticationScreen = props => {

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const dispatch = useDispatch();

  const emailTextChange = (emailText) => {
    setUser({...user, email: emailText});
  };
  const passwordTextChange = (passwordText) => {
    setUser({...user, password: passwordText});
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
        <View style={styles.inputView}>
          <TextInput label="E-mail" placeholder="email@example.com" value={user.email} onChangeText={emailTextChange} />
          <HelperText type="error" visible={inputEmailHasErrors()}>
            Email inválido
          </HelperText>
          <TextInput label="Contraseña" value={user.password} onChangeText={passwordTextChange} />
          <HelperText type="error" visible={inputPasswordHasErrors()}>
            Contraseña inválida (8 caracteres, mínimo un número)
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
    height: 120
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