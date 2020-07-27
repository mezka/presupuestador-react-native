import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = props => {
  return  <View style={ styles.parentView }>
            <View style={styles.buttonView}>
              <Button mode="contained" onPress={() => props.navigation.navigate('NewEstimateSetup')}>Nuevo</Button>
              <Button mode="contained" onPress={() => props.navigation.navigate('ViewEditEstimate')}>Ver/Editar</Button>
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
})

export default HomeScreen;
