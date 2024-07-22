"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { useAuth } from "@/hooks/socket/useAuth";
import { useTransaction } from "@/hooks/socket/useTransaction";
import { DataUserProvider, Qrcode, Transaction } from "@/types/types";
import { usePayment } from "@/hooks/socket/usePayment";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = useQueryClient();

  const manager = useContext(ManagerContext);

  useAuth(manager as Manager);
  useTransaction(manager as Manager);

  const [qrcode, setQRCode] = useState<Qrcode>();
  const [transaction, setTransaction] = useState<Transaction[]>();

  const getDataQuery = async () => {
    // promise function for await get data qrcode from query 'qrcode'
    const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
      const data: any = queryClient.getQueryData(["qrcode"]);
      if (data) resolve(data as Qrcode);
    });
    const dataQrcode = await qrCodeAsync;
    setQRCode(dataQrcode);

    // promise function for await get data transaction from query 'transaction'
    const transactionAsync: Promise<Transaction[]> = new Promise((resolve) => {
      const data: any = queryClient.getQueryData(["transaction"]);
      if (data) resolve(data as Transaction[]);
    });
    const dataTransaction = await transactionAsync;
    setTransaction(dataTransaction);
  };
  getDataQuery();

  const data: DataUserProvider = {
    qrcode: !qrcode ? null : qrcode,
    transaction: !transaction ? null : transaction,
  };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
