import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const AuthenticationScreen = props => {

  const navigateToLogin = () => {
    props.navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  //may show login/signup frame inside a Modal component instead of a new screen
  return <View style={styles.parentView}>
    <View style={styles.buttonView}>
      <Button mode="contained" onPress={navigateToLogin}>Ingreso</Button>
      <Button mode="contained" onPress={navigateToSignup}>Registro</Button>
    </View>
  </View>
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
  }
});

export default AuthenticationScreen;