import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, Checkbox, Button } from 'react-native-paper';
import log from 'loglevel';

const ProductAddView = ({products, addEstimateItemHandler}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    const checkboxStateSetToFalse = products.reduce((obj, product) => {
      obj[product.id] = false;
      return obj;
    }, {})
    setCheckboxes(checkboxStateSetToFalse);
  }, []);

  const handleAddEstimateItem = () => {
    for(const id in checkboxes){
      if(checkboxes[id]){
        addEstimateItemHandler(id);
      }
    }
  };

  const createCheckboxHandler = (product) => {
    return () => {
      setCheckboxes({...checkboxes, [product.id]: !checkboxes[product.id]});
    }
  };

  const productList = products.map(product => {

    return(
      <View key={product.id} style={styles.productCheckbox}>
        <Checkbox status={checkboxes[product.id]? 'checked' : 'unchecked'} onPress={createCheckboxHandler(product)}/>
        <Text>{product.model}</Text>
      </View>
    );
  });

  return (
    <View>
      <Searchbar placeholder="Buscar" onChangeText={onChangeSearch} value={searchQuery}/>
      {productList}
      <Button mode="contained" onPress={handleAddEstimateItem}>Agregar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  productCheckbox: {
    flexDirection: 'row'
  }
});

export default ProductAddView;