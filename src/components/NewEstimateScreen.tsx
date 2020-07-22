import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api/products';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import log from 'loglevel';

const NewEstimateScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState({0:{id: 0}, 1: {id:1}});
  const {data: productData} = useQuery('products', getProducts);
  const client = props.route.params.client;

  useEffect(() => {
    if(productData){
      setProducts(productData);
    }
  }, [productData]);

1
  const handleProductChange = (selectedValue) =>{
    log.info('handleProductChange:');
    log.info(selectedValue);
  }

  const productPickers = Object.keys(items).map((itemKey) => {

    log.info(products[0]);
    log.info(items[0]);

    return (
    <Picker key={itemKey} selectedValue={items[itemKey].id} onValueChange={handleProductChange}>
      {products.map((product) => <Picker.Item key={product.id} label={product.model}/>)}
    </Picker>
    );
  });


  return (
    <View>
      <View>
        {productPickers}
      </View>
      <Text>NewEstimateScreen, clientId: {client.id}</Text>
    </View>);
}

const styles = StyleSheet.create({
  chipView: {
    flexDirection: "row",
  },
});

export default NewEstimateScreen;