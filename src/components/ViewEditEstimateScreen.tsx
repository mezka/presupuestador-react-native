import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEstimates, exportEstimate } from '../actions/estimates';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text, Button } from 'react-native-paper';
import { loadEstimateItem } from '../actions/estimateItems';
import * as RootNavigation from './RootNavigation';

const ViewEditEstimateScreen = (props) => {

  const dispatch = useDispatch();
  const estimates = useSelector(state => state.estimates.estimates);

  useEffect(() => {
    dispatch(getEstimates());
  }, []);

  useEffect(() => {
    console.log(estimates);
  }, [estimates]);

  
  const handleEditEstimatePress = (selectedEstimateId, estimateItems, clientid) => {
    estimateItems.forEach((item, index, array) => {
      dispatch(loadEstimateItem(item.id, item.quantity, item.unitprice));
    });
    RootNavigation.navigate('NewEstimate', {selectedEstimateId: selectedEstimateId, clientid: clientid});
  };
  const handleDownloadAsPDFPress = (estimateId, filename) => {

    dispatch(exportEstimate(estimateId, filename, 'pdf'));
  };

  const estimateDataTableCells = estimates.map((estimate) => {
      let estimateitems_total = estimate.estimateitems.reduce((acc, curr) => {return acc+(curr.unitprice*curr.quantity)}, 0);
      let total_label = `$${estimateitems_total}`;
      return (
        <DataTable.Row style={{paddingHorizontal: 0}} key={estimate.id}>
          <DataTable.Cell style={{...styles.cellSmall, backgroundColor: 'red'}} >{estimate.id}</DataTable.Cell>
          <DataTable.Cell style={styles.cellLarge}>{estimate.createdAt.substring(0, 10)}</DataTable.Cell>
          <DataTable.Cell style={styles.cellLarge}>{estimate.client.name}</DataTable.Cell>
          <DataTable.Cell style={styles.cellLarge}>{total_label}</DataTable.Cell>
          <DataTable.Cell style={styles.cellSmall} onPress={() => handleEditEstimatePress(estimate.id, estimate.estimateitems, estimate.client.id)}>X</DataTable.Cell>
          <DataTable.Cell style={{...styles.cellSmall, backgroundColor: 'red'}} onPress={() => handleDownloadAsPDFPress(estimate.id, `PRE ${estimate.id} - ${estimate.client.name}.pdf`)}>X</DataTable.Cell>
        </DataTable.Row>
      );
  });

  return  <View style={ styles.parentView }>
            <DataTable style= {styles.dataTable}>
              <DataTable.Header style={{backgroundColor: 'blue', paddingHorizontal: 0}}>
                <DataTable.Title style={{...styles.cellSmall, backgroundColor: 'red'}}>N°</DataTable.Title>
                <DataTable.Title style={styles.cellLarge}>Fecha</DataTable.Title>
                <DataTable.Title style={styles.cellLarge}>Cliente</DataTable.Title>
                <DataTable.Title style={styles.cellLarge}>Total</DataTable.Title>
                <DataTable.Title style={styles.cellSmall}>Editar</DataTable.Title>
                <DataTable.Title style={{...styles.cellSmall, backgroundColor: 'red'}}>PDF</DataTable.Title>
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
    display: 'flex',
    backgroundColor: 'green',
  },
  cellLarge: {
    flexGrow: 8,
    flexBasis: 50,
  },
  cellSmall: {
    flexBasis: 35,
  }
})

export default ViewEditEstimateScreen;
