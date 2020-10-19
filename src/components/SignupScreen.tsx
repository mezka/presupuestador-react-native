import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../actions/auth';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

const SignupScreen = props => {

  const [user, setUser] = useState({name: '', email: '', password: '', repeatedPassword: ''});
  const dispatch = useDispatch();

  const nameTextChange = (nameText) => {
    setUser({...user, name: nameText});
  };

  const emailTextChange = (emailText) => {
    setUser({...user, email: emailText});
  };

  const passwordTextChange = (passwordText) => {
    setUser({...user, password: passwordText});
  };

  const repeatedPasswordTextChange = (repeatedPasswordText) => {
    setUser({...user, repeatedPassword: repeatedPasswordText});
  };

  const handleSignupPress = () => {
    if (!(user.email==='' || user.password==='' || user.name==='' || inputNameHasErrors() || inputEmailHasErrors() || inputPasswordHasErrors() || inputRepeatedPasswordHasErrors())) {
      dispatch(addUser(user));
    }
  };

  const inputNameHasErrors = () => {
    return !(/^$|^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[a-záéíóúñ]?['-]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)$/.test(user.name));
  };

  const inputEmailHasErrors = () => {
    return !(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email));
  };

  const inputPasswordHasErrors = () => {
    return !(/^$|^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/g.test(user.password));
  };

  const inputRepeatedPasswordHasErrors = () => {
    return user.password!==user.repeatedPassword;
  };

  return (
    <View style={styles.parentView}>

      <View style={styles.inputView}>
        <TextInput onChangeText={nameTextChange} label="Nombre" mode="flat" placeholder="Nombre y Apellido" value={user.name} />
        <HelperText type="error" visible={inputNameHasErrors()}>
            Nombre inválido
        </HelperText>
        <TextInput onChangeText={emailTextChange} label="E-mail" mode="flat" placeholder="nombre@dominio.com" value={user.email} />
        <HelperText type="error" visible={inputEmailHasErrors()}>
            Email inválido
        </HelperText>
        <TextInput onChangeText={passwordTextChange} mode="flat" label="Contraseña" value={user.password} secureTextEntry={true} />
        <HelperText type="error" visible={inputPasswordHasErrors()}>
            Contraseña inválida
        </HelperText>
        <TextInput onChangeText={repeatedPasswordTextChange} mode="flat" label="Repetir Contraseña" value={user.repeatedPassword} secureTextEntry={true} />
        <HelperText type="error" visible={inputRepeatedPasswordHasErrors()}>
            Las contraseñas no coinciden
        </HelperText>
      </View>

      <View style={styles.buttonView}>
        <Button mode="contained" onPress={handleSignupPress}>Registrar Usuario</Button>
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
    marginTop: 250,
    marginBottom: 100,
    width: 200,
    height: 100
  }
});

export default SignupScreen;