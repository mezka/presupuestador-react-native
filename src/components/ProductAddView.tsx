import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, Checkbox, Button } from 'react-native-paper';

const ProductAddView = ({products, filteredProducts, addEstimateItem, setProductsFilter, setProductsSearchAndFilter}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    
    const checkboxStateSetToFalse = products.reduce((obj, product) => {
      obj[product.id] = false;
      return obj;
    }, {});
    
    setCheckboxes(checkboxStateSetToFalse);

  }, []);

  const addEstimateItems = () => {
    for(const id in checkboxes){
      if(checkboxes[id]){
        addEstimateItem(Number(id));
      }
    }
  };

  const createCheckboxHandler = (product) => {
    return () => {
      setCheckboxes({...checkboxes, [product.id]: !checkboxes[product.id]});
    }
  };

  const productList = filteredProducts.map(product => {
    return(
      <View key={product.id} style={styles.productCheckbox}>
        <Checkbox status={checkboxes[product.id]? 'checked' : 'unchecked'} onPress={createCheckboxHandler(product)}/>
        <Text>{product.modelname}</Text>
      </View>
    );
  });

  const onChangeSearch = (queryString) => {
    if(queryString.length < searchQuery.length){
      setProductsFilter((product) => true);
    } else {
      setProductsSearchAndFilter(queryString, (product) => true);
    }
    setSearchQuery(queryString);
  };

  return (
    <View>
      <Searchbar placeholder="Buscar" onChangeText={onChangeSearch} value={searchQuery}/>
      {productList}
      <Button mode="contained" onPress={addEstimateItems}>Agregar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  productCheckbox: {
    flexDirection: 'row'
  }
});

export default ProductAddView;