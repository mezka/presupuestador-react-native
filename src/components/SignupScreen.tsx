import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../actions/users';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const SignupScreen = props => {

  const [user, setUser] = useState({email: '', password: ''});
  const dispatch = useDispatch();

  const emailTextChange = (emailText) => {
    setUser({...user, email: emailText});
  };
  const passwordTextChange = (passwordText) => {
    setUser({...user, password: passwordText});
  };

  const handleSignupPress = () => {
    dispatch(addUser(user));
  };

  return (
    <View style={styles.parentView}>

      <View style={styles.inputView}>
        <TextInput onChangeText={emailTextChange} label="E-mail" mode="flat" placeholder="email@example.com" value={user.email} />
        <TextInput label="Repetir E-mail" placeholder="email@example.com" />
        <TextInput onChangeText={passwordTextChange} label="Contraseña" value={user.password} />
        <TextInput label="Repetir Contraseña" />
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
    marginTop: 200,
    marginBottom: 50,
    width: 200,
    height: 100
  }
});

export default SignupScreen;