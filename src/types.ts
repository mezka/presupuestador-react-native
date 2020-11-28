export interface Client {
  id?: number,
  name: string,
  address0: string,
  email0: string,
  phonenumber0: string,
  cuil: string,
  taxcategory?: string,
  tacpercent?: number
}

export interface Product {
  id: number,
  model: string,
  price: number
}

export interface User {
  name: string,
  email: string,
  password: string
}

export interface EstimateItem {
  id: 1,
  discount: 0,
  product: Product,
  productid: 1,
  quantity: 1,
  unitprice: 21700,
}

export interface Estimate {
  id: number,
  client: Client,
  estimateitems: EstimateItem[],
  user: User,
  validFor?: number,
  updatedAt?: string,
  createdAt?: string,
}