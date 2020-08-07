import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';
import { changeEstimateItemProduct, changeEstimateItemQty, addEstimateItem, removeEstimateItem } from '../actions/estimateItems';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Dialog, Portal, FAB, Appbar } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import ProductAddView from './ProductAddView';
import log from 'loglevel';

const NewEstimateScreen = (props) => {
  const estimateItems = useSelector(state => state.estimate);
  const products = useSelector(state => state.products.products);
  const totalWithoutTaxes = useSelector(state => Object.values(state.estimate).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.price, 0));
  const totalWithTaxes = useSelector(state => Object.values(state.estimate).reduce((acum, estimateItem) => acum + estimateItem.quantity * estimateItem.price * 1.21, 0));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleDialog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  useEffect(() => {
    log.info(products);
  }, [products])

  useEffect(() => {
    log.info(estimateItems);
  }, [estimateItems]);

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

  const handleAddEstimateItem = (productId: number) => {
    dispatch(addEstimateItem(productId, 1));
  };

  const createRemoveEstimateItem = (estimateItemId: number) => {
    return () => {
      dispatch(removeEstimateItem(estimateItemId));
    }
  }

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
      {productPickers.length? productPickers : <View style={styles.textCenter}><Text>NO HAY ITEMS</Text></View>}
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
              <ProductAddView products={products} addEstimateItemHandler={handleAddEstimateItem} />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        <FAB style={styles.fab} small={true} icon="plus" onPress={toggleDialog} />
      </Portal>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon="content-save-outline" onPress={() => console.log('Pressed save')}/>
        <Appbar.Action icon="share-variant" onPress={() => console.log('Pessed label')} />
        <Appbar.Content style={{flexDirection: 'column-reverse', flex: 3}} titleStyle={{textAlign:'right'}} subtitleStyle={{textAlign:'right'}} subtitle="Subtotal: " title="Total + IVA: "/>
        <Appbar.Content style={{flexDirection: 'column-reverse'}} titleStyle={{textAlign:'right'}} subtitleStyle={{textAlign:'right'}} title={`${totalWithTaxes}`} subtitle={`${totalWithoutTaxes}`}/>
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
    bottom: 0,
  },
  priceText: {
    color: 'white'
  }
});

export default NewEstimateScreen;