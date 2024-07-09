"use client";

import useManagerSocket from "./useManagerSocket";

const useTransactionSocket = (idToken: string) => {
  const manager = useManagerSocket();

  if (!manager) {
    return;
  }

  const transactionSocket = manager.socket("/transaction", {
    auth: {
      token: idToken !== "" ? idToken : "",
    },
  });
  return transactionSocket;
};

export default useTransactionSocket;
