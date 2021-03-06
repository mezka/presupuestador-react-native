import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../actions/auth';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, HelperText, TextInput } from 'react-native-paper';

const SignupScreen = props => {

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [repeatedPasswordHidden, setRepeatedPasswordHidden] = useState(true);

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
    setRepeatedPassword(repeatedPasswordText);
  };

  const handleHidePasswordPress = () => {
    setPasswordHidden(!passwordHidden);
  };

  const handleHideRepeatedPasswordPress = () => {
    setRepeatedPasswordHidden(!repeatedPasswordHidden);
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

    return user.password!==repeatedPassword;
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
          <View style={styles.passwordView}>
            <TextInput onChangeText={passwordTextChange} style={{flex: 0.9}} mode="flat" label="Contraseña" value={user.password} secureTextEntry={passwordHidden} />
            <IconButton icon={passwordHidden?"eye":"eye-off"} style={{flex: 0.1}} size={20} onPress={handleHidePasswordPress} />
          </View>
          <HelperText type="error" visible={inputPasswordHasErrors()}>
            Contraseña inválida
          </HelperText>
          <View style={styles.passwordView}>
            <TextInput onChangeText={repeatedPasswordTextChange} style={{flex: 0.9}} mode="flat" label="Repetir Contraseña" value={repeatedPassword} secureTextEntry={repeatedPasswordHidden} />
            <IconButton icon={repeatedPasswordHidden?"eye":"eye-off"} style={{flex: 0.1}} size={20} onPress={handleHideRepeatedPasswordPress} />
          </View>
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
    height: 50
  },
  inputView: {
    justifyContent: 'center',
    marginTop: 250,
    marginBottom: 100,
    width: 200,
    height: 100,
  },
  passwordView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    width: 235,
    marginTop: 35,
    marginBottom: 35
  }
});

export default SignupScreen;