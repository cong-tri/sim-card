// type format Qrcode of return data from socket io namespace '/auth'
export type Qrcode = {
  ios: string;
  android: string;
};

// type format FieldType of signin form
export type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// type format Transaction of return data from socket io namespace '/transaction'
export type Transaction = {
  id: string,
  date: string | Date,
  service: string,
  product: string,
  amount: number,
  currency: string,
  read: boolean,
};

// type format UserProvider for data of UserProvider
export type DataUserProvider = {
  qrcode: Qrcode | null,
  transaction: Transaction[] | null,
}