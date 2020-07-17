import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api/products';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const NewEstimateScreen = (props) => {
  const [products, setProducts] = useState([]);
  const {data: productData} = useQuery('products', getProducts);
  const client = props.route.params.client

  useEffect(() => {
    if(productData){
      setProducts(productData);
    }
  }, [productData]);

  const productItems = products.map((product) => <Text key={product.id}>{product.name}</Text>);

  return (
    <View>
      <Text>NewEstimateScreen, clientId: {client.id}</Text>
      { productItems }
    </View>);
}

export default NewEstimateScreen;