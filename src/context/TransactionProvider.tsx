"use client";
import React, { createContext, useEffect, useState } from "react";
import useTransactionSocket from "@/hook/socket/useTransactionSocket";

export const TransactionContext = createContext({});

export const TransactionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(false);

  const transactionSocket = useTransactionSocket();

  useEffect(() => {
    if (transactionSocket?.connected) {
      setIsConnected(true);
    }

    transactionSocket?.on("connect", () => setIsConnected(true));

    transactionSocket?.emit("info", {
      id: "666863229c4962324ceab295",
    });

    transactionSocket?.on("info", () => {
      transactionSocket.disconnect();
    });

    transactionSocket?.on("disconnect", () => setIsConnected(false));

    return () => {
      transactionSocket?.off("connect", () => setIsConnected(false));
      transactionSocket?.off("disconnect", () => setIsConnected(false));
    };
  }, []);
  const listTransaction = [
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 1",
      amount: 50,
      currency: "$",
      read: false,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 2",
      amount: 100,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 3",
      amount: 1200,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 4",
      amount: 1500,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 5",
      amount: 200,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 6",
      amount: 1000,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 7",
      amount: 90,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 8",
      amount: 330,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 9",
      amount: 550,
      currency: "$",
      read: true,
    },
    {
      id: "666863229c4962324ceab295",
      date: "2024-06-27T07:04:53.286Z",
      service: "simcard",
      product: "SG SIM Standard Plan 10",
      amount: 400,
      currency: "$",
      read: true,
    },
  ];
  return (
    <TransactionContext.Provider value={listTransaction}>
      {children}
    </TransactionContext.Provider>
  );
};
