import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';
import { changeEstimateItemProduct, changeEstimateItemQty, addEstimateItem } from '../actions/estimateItems';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Dialog, Portal } from 'react-native-paper';
import EstimateItemPicker from './EstimateItemPicker';
import log from 'loglevel';

const NewEstimateScreen = (props) => {
  const estimateItems = useSelector(state => state.estimate);
  const productData = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  useEffect(() => {
    log.info('productDataChange');
    log.info(productData);
  }, [productData])

  useEffect(() => {
    log.info('estimateItemChange');
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

  const handleAddEstimateItem = () => {
    dispatch(addEstimateItem(1, 1));
    log.info(productData);
    log.info(estimateItems);
  };

  const productPickers = Object.keys(estimateItems).map((estimateItemId) => {
    return (
      <View key={estimateItemId} style={styles.itemView}>
        <EstimateItemPicker
          estimateItem={estimateItems[estimateItemId]}
          qtyChangeHandler={createQtyChangeHandler(estimateItemId)}
          productChangeHandler={createProductChangeHandler(estimateItemId)}
          products={productData.products}/>
      </View>
    );
  });


  return (
    <ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
              <Text>This is a scrollable area</Text>
              <Button mode="contained" onPress={handleAddEstimateItem}>Agregar</Button>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <View>
        <Button mode="contained" onPress={toggleDialog}>Nuevo</Button>
      </View>
      <View>
        {productPickers}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemView: {
    marginHorizontal: 0
  }
});

export default NewEstimateScreen;