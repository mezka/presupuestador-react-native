import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';
import { changeEstimateItemProduct, changeEstimateItemQty, addEstimateItem, removeEstimateItem } from '../actions/estimateItems';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Dialog, Portal, FAB } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import ProductAddView from './ProductAddView';
import log from 'loglevel';

const NewEstimateScreen = (props) => {
  const estimateItems = useSelector(state => state.estimate);
  const productData = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  useEffect(() => {
    log.info(productData);
  }, [productData])

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
          products={productData.products} />
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
              <ProductAddView products={productData.products} addEstimateItemHandler={handleAddEstimateItem} />
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
        <FAB style={styles.fab} small={true} icon="plus" onPress={toggleDialog} />
      </Portal>
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
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NewEstimateScreen;