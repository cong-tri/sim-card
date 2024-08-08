// type format Qrcode of return data from socket io namespace '/auth'
export type Qrcode = {
  ios: string;
  android: string;
};

// type format FieldType of signin form
export type FieldTypeSignin = {
  username?: string;
  password?: string;
  remember?: string;
};

// type format FieldTypeUpdateUser of update user's contribute form
export type FieldTypeUpdateUser = {
  userId: string;
  username: string;
  email: string;
  family_name: string;
  given_name: string;
  phone_number: string;
  zoneinfo: string;
  locale: string;
};

// type format Transaction of return data from socket io namespace '/transaction'
export type Transaction = {
  id: string;
  date: string | Date;
  service: string;
  product: string;
  amount: number;
  currency: string;
  read: boolean;
};

// type format UserProvider for data of UserProvider
export type DataUserProvider = {
  qrcode: Qrcode | null;
  transaction: Transaction[] | null;
};


// type format user contribute
export type UserAttributes = {
  sub: string;
  zoneinfo: string;
  email_verified: string;
  phone_number_verified: string;
  phone_number: string;
  locale: string;
  given_name: string;
  family_name: string;
  email: string;
};

// type format current user
export type CurrentUser = {
  username: string;
  userId: string;
  signInDetails: {
    loginId: string;
    authFlowType: string;
  };
};

// type format MainProvider for data of UserProvider
export type DataMainProvider = {
  currentUser: CurrentUser | undefined;
  userAttributes: UserAttributes | undefined;
};
