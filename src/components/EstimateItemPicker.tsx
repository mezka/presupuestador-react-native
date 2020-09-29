import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Text, IconButton } from 'react-native-paper';

const EstimateItemPicker = ({ estimateItem, qtyChangeHandler, productChangeHandler, removeEstimateItem, products }) => {

  const qtyArray = Array.from(Array(10), (_, i) => i + 1);
  
  return (
    <View style={styles.estimateItemView}>
      <View style={styles.topRowView}>
        <Picker style={styles.qtyPicker} selectedValue={String(estimateItem.quantity)} onValueChange={qtyChangeHandler}>
          {qtyArray.map((quantity) => <Picker.Item value={String(quantity)} key={quantity} label={String(quantity)}/>)}
        </Picker>
        <Picker style={styles.productPicker} selectedValue={String(estimateItem.productId)} onValueChange={productChangeHandler}>
          {products.map((product) => <Picker.Item value={String(product.id)} key={product.id} label={product.modelname}/>)}
        </Picker>
      </View>
      <View style={styles.testView}>
        <IconButton style={styles.deleteIcon} onPress={removeEstimateItem} icon="trash-can"/>
        <Text style={styles.priceText}>
          ${estimateItem.quantity * estimateItem.price}
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