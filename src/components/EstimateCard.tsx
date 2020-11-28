import React, {useMemo} from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Subheading, Button } from 'react-native-paper';
import { Estimate, EstimateItem } from '../types';

const EstimateCard = ({estimate, editEstimate, exportEstimate, ...props} : {estimate: Estimate, editEstimate: Function, exportEstimate: Function, props: any}) => {


  const handleEditPress = () => {
    editEstimate(estimate);
  };

  const handleExportPress = () => {
    exportEstimate(estimate);
  }

  const estimatePrice = useMemo(() => {
    
    const totalReducer = (accumulator: number, current: EstimateItem) => accumulator + current.unitprice * current.quantity * ((100 - current.discount) / 100);

    return estimate.estimateitems.reduce(totalReducer, 0);
  }, [estimate.estimateitems]);

  const createdAt = useMemo(() => {

    const date = new Date(estimate.createdAt);

    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }, [estimate.createdAt]);

  const updatedAt = useMemo(() => {

    const date = new Date(estimate.updatedAt);

    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }, [estimate.updatedAt]);

  return(
  <Card style={styles.card}>
    <Card.Title title={`N° ${estimate.id} - ${estimate.client.name}`} titleStyle={{alignSelf: 'center'}}></Card.Title>
    <Card.Content style={styles.spaceAround}>
      <View>
        <Subheading>Creado: {createdAt}</Subheading>
        <Subheading>Actualizado: {updatedAt}</Subheading>
      </View>
      <Subheading>Total: ${estimatePrice}</Subheading>
    </Card.Content>
    <Card.Actions style={styles.spaceAround}>
      <Button icon="delete" onPress={handleEditPress}>Editar</Button>
      <Button icon="download" onPress={handleExportPress}>Exportar</Button>
    </Card.Actions>
  </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});


export default EstimateCard;