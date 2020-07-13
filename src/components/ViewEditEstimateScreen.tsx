import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewEditEstimateScreen = () => {
  return  <View style={ styles.parentView }>
            <Text>ViewEditScreen</Text>
          </View>
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 120,
    height: 200
  },
})

export default ViewEditEstimateScreen;
