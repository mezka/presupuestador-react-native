import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEstimates } from '../actions/estimates';
import { View, StyleSheet } from 'react-native';
import { DataTable, Button } from 'react-native-paper';

const ViewEditEstimateScreen = (props) => {

  const dispatch = useDispatch();
  const estimates = useSelector(state => state.estimates.estimates);
  const userId = useSelector(state => state.auth.user.id);

  useEffect(() => {
    dispatch(getEstimates());
  }, []);
  
  return  <View style={ styles.parentView }>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title sortDirection='ascending'>Presupuesto #</DataTable.Title>
                <DataTable.Title>Fecha</DataTable.Title>
                <DataTable.Title>Cliente</DataTable.Title>
                <DataTable.Title>Total</DataTable.Title>
                <DataTable.Title>Validez</DataTable.Title>
                <DataTable.Title></DataTable.Title>
                <DataTable.Title></DataTable.Title>
              </DataTable.Header>
              { estimates.length ?
                  estimates.map((estimate) => {
                    if (estimate.user.id === userId) {
                      let estimateitems_total = estimate.estimateitems.reduce((acc, curr) => {return acc+(curr.unitprice*curr.quantity)}, 0);
                      let total_label = `$${estimateitems_total}`;
                      return (
                        <DataTable.Row key={estimate.id}>
                          <DataTable.Cell>{estimate.id}</DataTable.Cell>
                          <DataTable.Cell>{estimate.createdAt.substring(0, 10)}</DataTable.Cell>
                          <DataTable.Cell>{estimate.client.name}</DataTable.Cell>
                          <DataTable.Cell>{total_label}</DataTable.Cell>
                          <DataTable.Cell>{estimate.validFor + ' meses'}</DataTable.Cell>
                          <DataTable.Cell><Button mode="contained">Editar</Button></DataTable.Cell>
                          <DataTable.Cell><Button mode="contained">PDF</Button></DataTable.Cell>
                        </DataTable.Row>
                      )
                    }
                  })
                : <DataTable.Row></DataTable.Row>
              }
            </DataTable>
          </View>
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    marginTop: 120,
    marginHorizontal: 100,
    height: 200
  }
})

export default ViewEditEstimateScreen;
