"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { useAuth, useGetQrcodeQuery } from "@/hooks/socket/useAuth";
import { useTransaction } from "@/hooks/socket/useTransaction";
import { DataUserProvider, Qrcode, Transaction } from "@/types/types";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const manager = useContext(ManagerContext);

  useAuth(manager as Manager);
  // useTransaction(manager as Manager);

  const [qrcode, setQRCode] = useState<Qrcode>();

  const data = useGetQrcodeQuery();

  useEffect(() => {
    if (!data) return;
    else setQRCode(data as Qrcode);
  }, [data, qrcode]);

  return (
    <UserContext.Provider value={qrcode ?? {}}>{children}</UserContext.Provider>
  );
};
