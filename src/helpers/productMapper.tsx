export const productMapper = (product) => {

  const {categories, ...productWithoutCategories} = product;

  const categoryProperties = categories.reduce((obj, category, idx) => {
    obj[`category${idx}`] = category;
    return obj;
  }, {})

  return {...productWithoutCategories, ...categoryProperties};
};