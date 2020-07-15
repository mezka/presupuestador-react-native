import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const NewEstimateScreen = (props) => {

  const clientId = props.route.params.clientId

  return <View><Text>NewEstimateScreen, clientId: {clientId}</Text></View>
}

export default NewEstimateScreen;