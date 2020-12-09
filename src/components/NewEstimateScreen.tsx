import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categories';
import {
  getProducts,
  setProductsCategoriesFilter as createSetProductsCategoriesFilter,
  setProductsSearchAndCategoriesFilter as createSetProductsSearchAndCategoriesFilter
} from '../actions/products';
import {
  changeEstimateItemAfterResolvingProduct,
  changeEstimateItemQty as createChangeEstimateItemQtyAction,
  addEstimateItemAfterResolvingProduct,
  removeEstimateItem as createRemoveEstimateItemAction,
  loadEstimateItemsByEstimateId,
  clearEstimateItems
} from '../actions/estimateItems';
import { addEstimate, updateEstimate } from '../actions/estimates';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Dialog, Portal, FAB, Appbar } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import ProductAddView from './ProductAddView';
import { useFocusEffect } from '@react-navigation/native';

const NewEstimateScreen = (props) => {
  const estimateitems = useSelector(state => state.estimateItems.estimateItemsList);
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(state => state.products.filteredProducts);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  const totalWithoutTaxes = useMemo(() => estimateitems.reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.unitprice, 0), [estimateitems]);
  const totalWithTaxes = useMemo(() => estimateitems.reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.unitprice * 1.21, 0), [estimateitems]);


  const toggleDialog = () => {
    setVisible(!visible);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearEstimateItems());
      };
    }, [])
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);


  useEffect(() => {
    if (props.route.params.estimateid) {
      dispatch(loadEstimateItemsByEstimateId(props.route.params.estimateid));
    }
  }, [props.route.params.estimateid]);


  const changeEstimateItemProduct = useCallback((checkboxId: number, productId: number) => {
    dispatch(changeEstimateItemAfterResolvingProduct(checkboxId, productId));
  }, []);

  const changeEstimateItemQty = useCallback((checkboxId: number, quantity: number) => {
    dispatch(createChangeEstimateItemQtyAction(checkboxId, quantity));
  }, []);


  const removeEstimateItem = useCallback((checkboxId: number) => {
    dispatch(createRemoveEstimateItemAction(checkboxId));
  }, [])

  const addEstimateItem = useCallback((productid: number) => {
    dispatch(addEstimateItemAfterResolvingProduct(productid, 1));
  }, []);

  const setProductsSearchAndCategoriesFilter = useCallback((query, categories) => {
    dispatch(createSetProductsSearchAndCategoriesFilter(query, categories));
  }, []);

  const setProductsCategoriesFilter = useCallback((categories) => {
    dispatch(createSetProductsCategoriesFilter(categories));
  }, []);

  const saveEstimate = () => {
    if (props.route.params.estimateid) {
      dispatch(updateEstimate(props.route.params.estimateid, { clientid: props.route.params.clientid, validFor: 10, estimateitems }));
    } else {
      dispatch(addEstimate({ clientid: props.route.params.clientid, validFor: 10, estimateitems }));
    }
  };

  const productPickers = estimateitems.map((estimateitem) => {
    return (
      <View key={estimateitem.checkboxId} style={styles.itemView}>
        <EstimateItemPicker
          estimateItem={estimateitem}
          changeEstimateItemQty={changeEstimateItemQty}
          changeEstimateItemProduct={changeEstimateItemProduct}
          removeEstimateItem={removeEstimateItem}
          products={products} />
      </View>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      {productPickers.length ? <ScrollView>{productPickers}</ScrollView> : <View style={styles.textCenter}><Text>NO HAY ITEMS</Text></View>}
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
              <ProductAddView products={products} categories={categories} filteredProducts={filteredProducts} setProductsCategoriesFilter={setProductsCategoriesFilter} setProductsSearchAndCategoriesFilter={setProductsSearchAndCategoriesFilter} addEstimateItem={addEstimateItem} />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        <FAB style={styles.fab} small={true} icon="plus" onPress={toggleDialog} />
      </Portal>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon="content-save-outline" onPress={saveEstimate} />
        <Appbar.Action icon="share-variant" onPress={() => console.log('Pessed label')} />
        <Appbar.Content style={styles.appbarHeadingBox} titleStyle={{ textAlign: 'right' }} subtitleStyle={{ textAlign: 'right' }} subtitle="Subtotal: " title="Total + IVA: " />
        <Appbar.Content style={styles.appbarTotalsBox} titleStyle={{ textAlign: 'right' }} subtitleStyle={{ textAlign: 'right' }} title={`$${totalWithTaxes}`} subtitle={`$${totalWithoutTaxes}`} />
      </Appbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  textCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    bottom: 55,
  },
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  appbarHeadingBox: {
    flexDirection: 'column-reverse',
    flex: 4,
  },
  appbarTotalsBox: {
    flexDirection: 'column-reverse',
    paddingHorizontal: 0,
    flex: 3,
    marginLeft: 0,
    marginRight: 5
  },
  priceText: {
    color: 'white'
  }
});

export default NewEstimateScreen;