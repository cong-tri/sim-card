"use client";

import { Manager } from "socket.io-client";

// export const useManager = () => {
//   const manager = new Manager("https://dev.ccsidd.com:9443", {
//     path: "/v2/socket.io",
//     autoConnect: false,
//   });
  
//   return manager;
// };

export const manager = new Manager("https://dev.ccsidd.com:9443", {
  path: "/v2/socket.io",
  autoConnect: false,
});