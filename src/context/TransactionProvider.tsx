"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import {
  useGetTransactionQuery,
  useTransaction,
} from "@/hooks/socket/useTransaction";
import { Transaction } from "@/types/types";

export const TransactionContext = createContext({});

export const TransactionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const manager = useContext(ManagerContext);
  useTransaction(manager as Manager);

  const [transaction, setTransaction] = useState<Transaction[]>();

  const data = useGetTransactionQuery();

  useEffect(() => {
    if (!data) return;
    setTransaction(data as Transaction[]);
  }, [data, transaction]);

  return (
    <TransactionContext.Provider value={transaction ?? []}>
      {children}
    </TransactionContext.Provider>
  );
};
