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
