"use client";
import React, { createContext, useContext } from "react";
import { useAuth } from "@/hooks/socket/useAuth";
import { useTransaction } from "@/hooks/socket/useTransaction";
import { useManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { Qrcode, Transaction } from "@/types/types";

const UserContext = createContext({} as { qrcode?: Qrcode, transaction?: Transaction[] });

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { manager } = useManagerContext();
  
  const { qrcode } = useAuth(manager as Manager);
  const { transaction } = useTransaction(manager as Manager);

  return (
    <UserContext.Provider value={{ qrcode, transaction }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
