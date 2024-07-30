"use client";

import React, { createContext, useContext } from "react";
import { useManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { useTransaction } from "@/hooks/socket/useTransaction";
import { Transaction } from "@/types/types";

const TransactionContext = createContext({} as { transaction?: Transaction[] });

export const TransactionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { manager } = useManagerContext();

  const { transaction } = useTransaction(manager as Manager);

  return (
    <TransactionContext.Provider value={{ transaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
