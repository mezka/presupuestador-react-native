import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categories';
import { getProducts, setProductsFilter as createSetProductsFilter, setProductsSearchAndFilter as createSetProductsSearchAndFilter} from '../actions/products';
import { changeEstimateItemProduct, changeEstimateItemQty, addEstimateItem as createAddEstimateItemAction, removeEstimateItem, loadEstimateItemsByEstimateId, clearEstimateItems } from '../actions/estimateItems';
import { addEstimate, updateEstimate } from '../actions/estimates';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Dialog, Portal, FAB, Appbar } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import ProductAddView from './ProductAddView';
import { useFocusEffect } from '@react-navigation/native';


const NewEstimateScreen = (props) => {
  const estimateitems = useSelector(state => state.estimateItems);
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(state => state.products.filteredProducts);
  const totalWithoutTaxes = useSelector(state => Object.values(state.estimateItems).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.unitprice, 0));
  const totalWithTaxes = useSelector(state => Object.values(state.estimateItems).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.unitprice * 1.21, 0));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  useFocusEffect(
    React.useCallback(() => {
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
    if(props.route.params.estimateid){
      dispatch(loadEstimateItemsByEstimateId(props.route.params.estimateid));
    }
  }, [props.route.params.estimateid]);

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

  const addEstimateItem = (productid: number) => {
    dispatch(createAddEstimateItemAction(productid, 1));
  };

  const setProductsFilter = (filterFn: Function) => {
    dispatch(createSetProductsFilter(filterFn));
  };

  const setProductsSearchAndFilter = (query: string, filterFn: Function) => {
    dispatch(createSetProductsSearchAndFilter(query, filterFn));
  };

  const createRemoveEstimateItem = (estimateItemId: number) => {
    return () => {
      dispatch(removeEstimateItem(estimateItemId));
    }
  };

  const saveEstimate = () => {
    const estimateitemsList = Object.keys(estimateitems).map((item) => {
      return {unitprice: estimateitems[item].unitprice, quantity: estimateitems[item].quantity, productid: estimateitems[item].productid};
    });
    
    if(props.route.params.estimateid){
      dispatch(updateEstimate(props.route.params.estimateid, {clientid: props.route.params.clientid, validFor: 10, estimateitems: estimateitemsList }));
    } else {
      dispatch(addEstimate({clientid: props.route.params.clientid, validFor: 10, estimateitems: estimateitemsList, }));
    }
  };

  const productPickers = Object.keys(estimateitems).map((estimateItemId) => {
    return (
      <View key={estimateItemId} style={styles.itemView}>
        <EstimateItemPicker
          estimateItem={estimateitems[estimateItemId]}
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
              <ProductAddView products={products} categories={categories} filteredProducts={filteredProducts} addEstimateItem={addEstimateItem} setProductsFilter={setProductsFilter} setProductsSearchAndFilter={setProductsSearchAndFilter} />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        <FAB style={styles.fab} small={true} icon="plus" onPress={toggleDialog} />
      </Portal>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon="content-save-outline" onPress={saveEstimate}/>
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