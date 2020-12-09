import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Text, IconButton } from 'react-native-paper';

const EstimateItemPicker = ({ estimateItem, changeEstimateItemQty, changeEstimateItemProduct, removeEstimateItem, products }) => {

  const productPickers = useMemo(() => products.map(product => <Picker.Item value={product.id} key={product.id} label={product.modelname}/>), [products]);
  const qtyPickers = useMemo(() => {
    const qtyArray = Array.from(Array(10), (_, i) => i + 1);

    return qtyArray.map((quantity) => <Picker.Item value={quantity} key={quantity} label={String(quantity)}/>);
  }, []);

  const handleQtyPickerChange = (quantity: number) => {
    changeEstimateItemQty(estimateItem.checkboxId, quantity);
  }

  const handleProductPickerChange = (productid: number) => {
    changeEstimateItemProduct(estimateItem.checkboxId, productid);
  }

  const handleRemoveEstimateItem = () => {
    removeEstimateItem(estimateItem.checkboxId);
  };
  
  return (
    <View style={styles.estimateItemView}>
      <View style={styles.topRowView}>
        <Picker style={styles.qtyPicker} selectedValue={estimateItem.quantity} onValueChange={handleQtyPickerChange}>
          {qtyPickers}
        </Picker>
        <Picker style={styles.productPicker} selectedValue={estimateItem.productid} onValueChange={handleProductPickerChange}>
          {productPickers}
        </Picker>
      </View>
      <View style={styles.testView}>
        <IconButton style={styles.deleteIcon} onPress={handleRemoveEstimateItem} icon="trash-can"/>
        <Text style={styles.priceText}>
          ${estimateItem.quantity * estimateItem.unitprice}
        </Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  estimateItemView: {
    marginVertical: 5,
    marginLeft: 10
  },
  testView: {
    flexDirection: "row",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtyPicker: {
    width: 90
  },
  productPicker: {
    flex: 1,
  },
  priceText: {
    textAlign: "right",
  },
  deleteIcon: {
    backgroundColor: "violet",
  },
  topRowView:{
    flexDirection: "row",
  }
})

export default EstimateItemPicker;