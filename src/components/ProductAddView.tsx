import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, Checkbox, Button, RadioButton, Chip } from 'react-native-paper';

const createKeepProductsThatHaveOneOfTheseCategoriesFilter = function(categoryList){

  return function(product){

    const {id, modelname, price, updatedAt, ...productCategories} = product;

    let includesOneOfCategoryList = false;

    for(let i = 0; i < categoryList.length && !includesOneOfCategoryList; i++){
      includesOneOfCategoryList = Object.values(productCategories).includes(categoryList[i]);
    }

    return includesOneOfCategoryList;
  };
}

const ProductAddView = ({categories, products, filteredProducts, addEstimateItem, setProductsFilter, setProductsSearchAndFilter}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  const [chips, setChips] = useState({})

  useEffect(() => {
    const checkboxStateSetToFalse = products.reduce((obj, product) => {
      obj[product.id] = false;
      return obj;
    }, {});
    
    setCheckboxes(checkboxStateSetToFalse);

  }, []);

  useEffect(() => {
    setChips(categories.reduce((obj, current) => {
      obj[current.id] = true;
      return obj;
    }, {}))
  }, [categories])

  const createChipHandler = (categoryid) => {

    return () => {
      const newChips = {...chips, [categoryid]: !chips[categoryid]};
      const categoryList = Object.entries(newChips).filter(chipEntries => chipEntries[1] === true).map(chipEntries => Number(chipEntries[0]));

      setChips(newChips);

      if(searchQuery){
        setProductsSearchAndFilter(searchQuery, createKeepProductsThatHaveOneOfTheseCategoriesFilter(categoryList));
      } else {
        setProductsFilter(createKeepProductsThatHaveOneOfTheseCategoriesFilter(categoryList))
      }
    }
  }

  const onChangeSearch = (queryString) => {

    const categoryList = Object.entries(chips).filter(chipEntries => chipEntries[1] === true).map(chipEntries => Number(chipEntries[0]));

    if(queryString.length < searchQuery.length){
      setProductsFilter(createKeepProductsThatHaveOneOfTheseCategoriesFilter(categoryList));
    } else {
      setProductsSearchAndFilter(queryString, createKeepProductsThatHaveOneOfTheseCategoriesFilter(categoryList));
    }

    setSearchQuery(queryString);
  };

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
      <View key={product.id} style={styles.productList}>
        <Checkbox status={checkboxes[product.id]? 'checked' : 'unchecked'} onPress={createCheckboxHandler(product)}/>
        <Text>{product.modelname}</Text>
      </View>
    );
  });

  const categoriesList = categories.map(category => {
    return(
      <View key={category.id} style={styles.category}>
        <Chip selected={chips[category.id]} onPress={createChipHandler(category.id)}>{category.name}</Chip>
      </View>
    );
  });

  return (
    <View>
      <Searchbar placeholder="Buscar" onChangeText={onChangeSearch} value={searchQuery}/>
      <RadioButton.Group>
        <View style={styles.categoriesList}>
          {categoriesList}
        </View>
      </RadioButton.Group>
      {productList}
      <Button mode="contained" onPress={addEstimateItems}>Agregar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'row'
  },
  category: {
    flexDirection: 'row',
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between'
  }
});

export default ProductAddView;