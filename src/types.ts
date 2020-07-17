export interface Client {
  id?: number,
  name: string,
  address: string,
  email: string,
  phonenumber: string,
}

export interface Product {
  id: number,
  model: string,
  price: number
}