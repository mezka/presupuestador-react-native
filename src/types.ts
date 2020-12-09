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
  id?: number,
  checkboxId?: number,
  discount: number,
  product?: Product,
  productid: number,
  quantity: number,
  unitprice: number,
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