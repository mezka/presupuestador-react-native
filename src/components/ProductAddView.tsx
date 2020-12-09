import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, Checkbox, Button, RadioButton, Chip } from 'react-native-paper';

const productCheckboxReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      const newCheckboxState = { ...state.checkboxes, [action.productid]: !state.checkboxes[action.productid] };
      return { ...state, checkboxes: { ...newCheckboxState }, products: Object.entries(newCheckboxState).filter(entries => entries[1]).map(entries => Number(entries[0])) };
    default:
      return { ...state };
  }
};

const categoriesReducer = (state, action) => {

  switch (action.type) {
    case 'toggle':
      const newChipState = { ...state.chips, [action.categoryid]: !state.chips[action.categoryid] };
      return { ...state, chips: { ...newChipState }, categories: Object.entries(newChipState).filter(entries => entries[1]).map(entries => Number(entries[0])) };
    default:
      return { ...state };
  }
}

const createChipsReducer = (chips, currentCategory) => {
  chips[currentCategory.id] = true;
  return chips;
}

const ProductAddView = ({ categories, filteredProducts, addEstimateItem, setProductsCategoriesFilter, setProductsSearchAndCategoriesFilter }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [checkboxes, dispatchCheckbox] = useReducer(productCheckboxReducer, { checkboxes: {}, products: [] });
  const [chips, dispatchChip] = useReducer(categoriesReducer, { chips: categories.reduce(createChipsReducer, {}), categories: categories.map(category => category.id) });


  useEffect(() => {
    if (searchQuery) {
      setProductsSearchAndCategoriesFilter(searchQuery, chips.categories);
    } else {
      setProductsCategoriesFilter(chips.categories);
    }
  }, [searchQuery, chips.categories]);

  const onChangeSearch = (queryString: string) => {
    setSearchQuery(queryString);
  };

  const addEstimateItems = () => {
    checkboxes.products.forEach((product: number) => {
      addEstimateItem(product);
    });
  };

  const productList = useMemo(() => (filteredProducts.map(product => (
    <View key={product.id} style={styles.productList}>
      <Checkbox status={checkboxes.checkboxes[product.id] ? 'checked' : 'unchecked'} onPress={() => dispatchCheckbox({ type: 'toggle', productid: product.id })} />
      <Text>{product.modelname}</Text>
    </View>
  ))), [filteredProducts, checkboxes])

  const categoriesList = useMemo(() => (categories.map(category => (
    <View key={category.id} style={styles.category}>
      <Chip selected={chips.chips[category.id]} onPress={() => dispatchChip({ type: 'toggle', categoryid: category.id })}>{category.name}</Chip>
    </View>
  ))), [categories, chips])

  return (
    <View>
      <Searchbar placeholder="Buscar" onChangeText={onChangeSearch} value={searchQuery} />
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