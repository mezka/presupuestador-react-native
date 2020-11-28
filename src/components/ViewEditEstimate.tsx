import React, { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { getEstimates, exportEstimate as exportEstimateAction} from '../actions/estimates';
import EstimateCard from './EstimateCard';
import { Estimate } from '../types';

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

    console.log('estimate');
    console.log(estimate);

    props.navigation.navigate('NewEstimate', {estimateid: estimate.id, clientid: estimate.client.id});
  }, []);

  return (
    <View style={styles.parentView}>
      <ScrollView style={styles.containerView}>
        {estimates.map((estimate: Estimate) => <EstimateCard key={estimate.id} estimate={estimate} editEstimate={editEstimate} exportEstimate={exportEstimate}/>)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  containerView: {
    marginTop: 100,
    marginHorizontal: 10
  },
})


export default ViewEditEstimate;
