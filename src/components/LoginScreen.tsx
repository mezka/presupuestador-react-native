import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/users';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const LoginScreen = props => {

  const [user, setUser] = useState({email: '', password: ''});
  const dispatch = useDispatch();

  const emailTextChange = (emailText) => {
    setUser({...user, email: emailText});
  };
  const passwordTextChange = (passwordText) => {
    setUser({...user, password: passwordText});
  };

  const handleLoginPress = () => {
    dispatch(loginUser(user));
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.inputView}>
        <TextInput label="E-mail" placeholder="email@example.com" value={user.email} onChangeText={emailTextChange} />
        <TextInput label="Contraseña" value={user.password} onChangeText={passwordTextChange} />
      </View>
      <View style={styles.buttonView}>
        <Button mode="contained" onPress={handleLoginPress}>Ingresar</Button>
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