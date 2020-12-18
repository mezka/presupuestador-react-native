import React, { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { getEstimates, exportEstimate as exportEstimateAction} from '../actions/estimates';
import EstimateCard from './EstimateCard';
import { Estimate } from '../types';
import { FAB } from 'react-native-paper';

const ViewEditEstimate = (props: any) => {
  
  const dispatch = useDispatch();
  const estimates = useSelector((state: any) => state.estimates.estimates);

  useEffect(() => {
    dispatch(getEstimates());
  }, [])

  const exportEstimate = useCallback((estimate: Estimate) => {
    dispatch(exportEstimateAction(estimate.id, `PRE ${estimate.id} - ${estimate.client.name}.pdf`, 'pdf'));
  }, []);

  const editEstimate = useCallback((estimate: Estimate) => {
    props.navigation.navigate('NewEstimate', {estimateid: estimate.id, clientid: estimate.client.id});
  }, []);

  const newEstimatePress = () => {
    props.navigation.navigate('NewEstimateSetup');
  }

  return (
    <View style={styles.parentView}>
      <ScrollView style={styles.containerView}>
        {estimates.map((estimate: Estimate) => <EstimateCard key={estimate.id} estimate={estimate} editEstimate={editEstimate} exportEstimate={exportEstimate}/>)}
      </ScrollView>
      <FAB style={styles.fab} icon="plus" onPress={newEstimatePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  containerView: {
    marginTop: '10%',
    marginHorizontal: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})


export default ViewEditEstimate;
