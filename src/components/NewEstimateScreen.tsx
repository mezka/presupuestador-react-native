import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, setProductsFilter, setProductsSearchAndFilter } from '../actions/products';
import { changeEstimateItemProduct, changeEstimateItemQty, addEstimateItem as createAddEstimateItemAction, removeEstimateItem, loadEstimateItems } from '../actions/estimateItems';
import { addEstimate, updateEstimate } from '../actions/estimates';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Dialog, Portal, FAB, Appbar } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import ProductAddView from './ProductAddView';

const NewEstimateScreen = (props) => {
  const estimateItems = useSelector(state => state.estimate);
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(state => state.products.filteredProducts);
  const totalWithoutTaxes = useSelector(state => Object.values(state.estimate).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.price, 0));
  const totalWithTaxes = useSelector(state => Object.values(state.estimate).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.price * 1.21, 0));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleDialog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    const {estimateitems, ...estimateData} = props.route.params.selectedEstimate;
    dispatch(loadEstimateItems(estimateitems));
  }, [props.route.params.selectedEstimate]);

  const createProductChangeHandler = (estimateItemId) => {
    return (optionValue) => {
      dispatch(changeEstimateItemProduct(estimateItemId, Number(optionValue)));
    };
  };

  const createQtyChangeHandler = (estimateItemId) => {
    return (optionValue) => {
      dispatch(changeEstimateItemQty(estimateItemId, Number(optionValue)))
    }
  };

  const addEstimateItem = (productId: number) => {
    dispatch(createAddEstimateItemAction(productId, 1));
  };

  const resetProductsFilter = () => {
    dispatch(setProductsFilter((product)=> true));
  };

  const setCategoryAndQuery = (category: string, query: string) => {

    let filterFn = (product) => true;

    if(category !== 'ALL')
      filterFn = (product) => product.category === category;
    
    dispatch(setProductsSearchAndFilter(query, filterFn));
  };

  const createRemoveEstimateItem = (estimateItemId: number) => {
    return () => {
      dispatch(removeEstimateItem(estimateItemId));
    }
  };

  const saveNewEstimate = () => {
    const estimateItemsList = Object.keys(estimateItems).map((item) => {
      return {unitprice: estimateItems[item].price, quantity: estimateItems[item].quantity, productid: estimateItems[item].productId};
    });
    dispatch(addEstimate({clientid: props.route.params.clientid, validFor: 10, estimateitems: estimateItemsList, }));
  };

  const saveEditedEstimate = () => {
    const estimateItemsList = Object.keys(estimateItems).map((item) => {
      return {unitprice: estimateItems[item].price, quantity: estimateItems[item].quantity, productid: estimateItems[item].productId};
    });
    dispatch(updateEstimate(props.route.params.selectedEstimate.id, {clientid: props.route.params.clientid, validFor: 10, estimateitems: estimateItemsList }));
  };

  const productPickers = Object.keys(estimateItems).map((estimateItemId) => {
    return (
      <View key={estimateItemId} style={styles.itemView}>
        <EstimateItemPicker
          estimateItem={estimateItems[estimateItemId]}
          qtyChangeHandler={createQtyChangeHandler(estimateItemId)}
          productChangeHandler={createProductChangeHandler(estimateItemId)}
          removeEstimateItem={createRemoveEstimateItem(estimateItemId)}
          products={products} />
      </View>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      {productPickers.length? <ScrollView>{productPickers}</ScrollView> : <View style={styles.textCenter}><Text>NO HAY ITEMS</Text></View>}
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
              <ProductAddView products={products} filteredProducts={filteredProducts} addEstimateItem={addEstimateItem} resetProductsFilter={resetProductsFilter} setCategoryAndQuery={setCategoryAndQuery} />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        <FAB style={styles.fab} small={true} icon="plus" onPress={toggleDialog} />
      </Portal>
      <Appbar style={styles.appbar}>
        {props.route.params.selectedEstimate ?
        <Appbar.Action icon="content-save-outline" onPress={saveEditedEstimate}/>
        :
        <Appbar.Action icon="content-save-outline" onPress={saveNewEstimate}/>
        }
        <Appbar.Action icon="share-variant" onPress={() => console.log('Pessed label')} />
        <Appbar.Content style={styles.appbarHeadingBox} titleStyle={{textAlign:'right'}} subtitleStyle={{textAlign:'right'}} subtitle="Subtotal: " title="Total + IVA: "/>
        <Appbar.Content style={styles.appbarTotalsBox} titleStyle={{textAlign:'right'}} subtitleStyle={{textAlign:'right'}} title={`$${totalWithTaxes}`} subtitle={`$${totalWithoutTaxes}`}/>
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