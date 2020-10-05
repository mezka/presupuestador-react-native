import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEstimates, exportEstimate } from '../actions/estimates';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text, Button } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';

const ViewEditEstimateScreen = (props) => {

  const dispatch = useDispatch();
  const estimates = useSelector(state => state.estimates.estimates);

  useEffect(() => {
    dispatch(getEstimates());
  }, []);
  
  const handleEditEstimatePress = (estimate) => {
    RootNavigation.navigate('NewEstimate', {estimate: estimate});
  };
  const handleDownloadAsPDFPress = (estimateId) => {
    dispatch(exportEstimate(estimateId, 'pdf'));
  };

  const estimateDataTableCells = estimates.map((estimate) => {
      let estimateitems_total = estimate.estimateitems.reduce((acc, curr) => {return acc+(curr.unitprice*curr.quantity)}, 0);
      let total_label = `$${estimateitems_total}`;
      return (
        <DataTable.Row style={{paddingLeft: 0, paddingRight: 0}} key={estimate.id}>
          <DataTable.Cell style={{backgroundColor: 'red'}} >{estimate.id}</DataTable.Cell>
          <DataTable.Cell>{estimate.createdAt.substring(0, 10)}</DataTable.Cell>
          <DataTable.Cell>{estimate.client.name}</DataTable.Cell>
          <DataTable.Cell>{total_label}</DataTable.Cell>
          <DataTable.Cell onPress={() => handleEditEstimatePress(estimate)}>X</DataTable.Cell>
          <DataTable.Cell style={{backgroundColor: 'red'}} onPress={() => handleDownloadAsPDFPress(estimate.id)}>X</DataTable.Cell>
        </DataTable.Row>
      );
  });

  return  <View style={ styles.parentView }>
            <DataTable style= {styles.dataTable}>
              <DataTable.Header style={{backgroundColor: 'blue', paddingLeft: 0, paddingRight: 0}}>
                <DataTable.Title style={{backgroundColor: 'red'}}>N°</DataTable.Title>
                <DataTable.Title>Fecha</DataTable.Title>
                <DataTable.Title>Cliente</DataTable.Title>
                <DataTable.Title>Total</DataTable.Title>
                <DataTable.Title>Editar</DataTable.Title>
                <DataTable.Title style={{backgroundColor: 'red'}}>PDF</DataTable.Title>
              </DataTable.Header>
              { 
                estimateDataTableCells
              }
            </DataTable>
          </View>
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    marginTop: 120,
    height: 200
  },
  dataTable: {
    backgroundColor: 'green',
  }
})

export default ViewEditEstimateScreen;
