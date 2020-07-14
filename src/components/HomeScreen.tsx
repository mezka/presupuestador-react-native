import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = props => {
  return  <View style={ styles.parentView }>
              <View style={styles.buttonView}>
                <Button style={ styles.buttonStyle } onPress={() => props.navigation.navigate('NewEstimateSetup')} title='Nuevo' />
                <Button style={ styles.buttonStyle } onPress={() => props.navigation.navigate('ViewEditEstimate')} title='Ver / Editar' />
              </View>
          </View>
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 120,
    height: 200
  },
  buttonView: {
    justifyContent: 'space-around',
    width: 200,
    flex: 1
  }
})

export default HomeScreen;
