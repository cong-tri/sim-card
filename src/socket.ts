"use client";

import { Manager } from "socket.io-client";

// const idToken: string =
//   "eyJraWQiOiJZSVNMUytwdTgxRGxhTnd6UGhwbGdcL0o4KzRuRytXUTlcL1JLUlhOODB4S3c9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0YmQ2MzU1ZC05ZmQ5LTQ4NTItYjZmYy05MTA3NmRiOGU4NDkiLCJjb2duaXRvOmdyb3VwcyI6WyJtZXJjaGFudCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2p2ZUhmc0o1WSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InYtci0xNzE4OTU1MTkyNTUwIiwiZ2l2ZW5fbmFtZSI6IlRyaSIsIm9yaWdpbl9qdGkiOiJjNjE1MzU0Mi0zYjA0LTQ2MTYtYmNiYy04MzY0ZmVkZTU0YjAiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo4Nzk2ODU0MDc1NjA6cm9sZVwvZGV2LWNjcy1hdXRoLVVzZXJBdXRoUm9sZS1JMVBNMEtUSUc5RlEiXSwiYXVkIjoiNXVrNGRjMnE3NmYzYXFpNmxnb3RhY2QxOTUiLCJldmVudF9pZCI6IjE4NGI5MmJiLTFjYzktNGM1Mi04ZDU2LTY4YTM5Y2E4NWRhNyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzIwMTUwNTEzLCJwaG9uZV9udW1iZXIiOiIrODQzMjYwMzQ1NjEiLCJleHAiOjE3MjAxNjUwNjYsImlhdCI6MTcyMDE1Nzg2NiwiZmFtaWx5X25hbWUiOiJEYW8gQ29uZyIsImp0aSI6Ijc3YjI2ZDcyLTg1NDYtNDFjYy1hOTMwLWU5NTRiMjJkNjdmMiIsImVtYWlsIjoiZGFvY29uZ3RyaTIwMDMxNjA5QGdtYWlsLmNvbSJ9.FtCnCLP4KD_98gXYKPYbEcBCxdWrL7qX77D83AB-oV942yzb4v-crsM5t28UPluj_ogrWc8Nbp_-W-ClfTxfTczWGZ7vRmzTEMN7UJCk0_09-lQCgeAsNmfaagrdWw16T185eUYypNrKcFlannvYTlblwWcNQLITbZfRxmO8ISlrAk-ErHNNT_pBsxIV3LyvGVJ44S6WBKP-ntdii9etzp3TejjBw_EDcXdFuMF0sCxMUA5DqwDrfc821k0KyJsN_AOd7jI7N1nSyOymP10WCEHyR4QWQ1gTq2xwcpdGrofD2kiLzIObkCSuaTH5o-raL-ffj5kGBStHUrb3SVsNLw";
export const manager = new Manager("https://dev.ccsidd.com:9443")
// export const authSocket = manager.socket("/auth", {
//   auth: {
//     token: !idToken ? null : idToken,
//   },
// });

// export const productSocket = manager.socket("/product", {
//   auth: {
//     token: !idToken ? null : idToken,
//   },
// });

// manager.open((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("success");
//   }
// });
 
// //manager.ts
// //authSocket.ts
// //transactionSocket.ts