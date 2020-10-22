export interface Client {
  id?: number,
  name: string,
  address0: string,
  email0: string,
  phonenumber0: string,
  cuil: string,
  taxcategory: string
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

export interface Estimate {
  clientid: number,
  validFor: number,
  estimateitems: []
}