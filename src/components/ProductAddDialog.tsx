import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Checkbox, Button, Dialog, Chip, withTheme} from 'react-native-paper';


const productAndCategoriesReducer = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_PRODUCT':
      const newCheckboxState = { ...state.checkboxes, [action.productid]: !state.checkboxes[action.productid] };
      return { ...state, checkboxes: { ...newCheckboxState }, products: Object.entries(newCheckboxState).filter(entries => entries[1]).map(entries => Number(entries[0])) };
    case 'TOGGLE_CATEGORY':
      const newChipState = { ...state.chips, [action.categoryid]: !state.chips[action.categoryid] };
      return { ...state, chips: { ...newChipState }, categories: Object.entries(newChipState).filter(entries => entries[1]).map(entries => Number(entries[0])), checkboxes: {}, products: []}
    default: 
      return { ...state };
  }
}

const createChipsReducer = (chips, currentCategory) => {
  chips[currentCategory.id] = true;
  return chips;
}

const ProductAddDialog = ({ categories, filteredProducts, addEstimateItem, setProductsCategoriesFilter, setProductsSearchAndCategoriesFilter, visible, toggleDialog }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [state, dispatch] = useReducer(productAndCategoriesReducer, { checkboxes: {}, products: [], chips: categories.reduce(createChipsReducer, {}), categories: categories.map(category => category.id)});

  useEffect(() => {
    if (searchQuery) {
      setProductsSearchAndCategoriesFilter(searchQuery, state.categories);
    } else {
      setProductsCategoriesFilter(state.categories);
    }
  }, [searchQuery, state.categories]);

  const onChangeSearch = (queryString: string) => {
    setSearchQuery(queryString);
  };

  const addEstimateItems = () => {
    state.products.forEach((product: number) => {
      addEstimateItem(product);
    });
    toggleDialog();
  };

  const productList = useMemo(() => (filteredProducts.map(product => (
    <View key={product.id} style={styles.productList}>
      <Checkbox.Item style={styles.checkbox} labelStyle={{}} status={state.checkboxes[product.id] ? 'checked' : 'unchecked'} onPress={() => dispatch({ type: 'TOGGLE_PRODUCT', productid: product.id })} label={product.modelname}/>
    </View>
  ))), [filteredProducts, state.checkboxes])

  const categoriesList = useMemo(() => (categories.map(category => (
    <View key={category.id} style={styles.category}>
      <Chip selected={state.chips[category.id]} onPress={() => dispatch({ type: 'TOGGLE_CATEGORY', categoryid: category.id })}>{category.name}</Chip>
    </View>
  ))), [state.categories, state.chips])

  return (
    <Dialog visible={visible} onDismiss={toggleDialog} style={styles.dialog}>
      <Searchbar placeholder="Buscar" onChangeText={onChangeSearch} value={searchQuery} />
      <View style={styles.categoriesList}>
        {categoriesList}
      </View>
      <Dialog.ScrollArea style={styles.scrollArea}>
        <ScrollView>
          {productList}
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={addEstimateItems}>Agregar</Button>
      </Dialog.Actions>
    </Dialog>
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
  },
  dialog: {
    flex: 1,
    marginVertical: '10%',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingTop: 5
  },
  scrollArea: {
    paddingHorizontal: 0,
  },
  checkbox: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    paddingHorizontal: 0
  }
});



export default ProductAddDialog;