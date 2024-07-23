"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useGetQrcodeQuery } from "@/hooks/socket/useAuth";
import { ManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { Qrcode } from "@/types/types";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const manager = useContext(ManagerContext);

  useAuth(manager as Manager);

  const data = useGetQrcodeQuery();
  
  const [qrcode, setQRCode] = useState<Qrcode>();

  useEffect(() => {
    if (!data) return;
    setQRCode(data as Qrcode);
  }, [data, qrcode]);

  return (
    <UserContext.Provider value={qrcode ?? {}}>{children}</UserContext.Provider>
  );
};
