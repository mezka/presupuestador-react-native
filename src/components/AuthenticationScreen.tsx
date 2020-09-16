import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/auth';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const AuthenticationScreen = props => {

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
  
  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.loginView}>
        <View style={styles.inputView}>
          <TextInput label="E-mail" placeholder="email@example.com" value={user.email} onChangeText={emailTextChange} />
          <TextInput label="Contraseña" value={user.password} onChangeText={passwordTextChange} />
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

/*const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonView: {
    justifyContent: 'space-around',
    height: 200
  }
});*/
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