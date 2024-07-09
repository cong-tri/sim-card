"use client";

import { Manager } from "socket.io-client";

const useManagerSocket = () => {
  const manager = new Manager("https://dev.ccsidd.com:9443");
  return manager;
};

export default useManagerSocket;
