"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/socket/useAuth";
import { ManagerContext } from "./ManagerProvider";
import { Manager } from "socket.io-client";
import { Qrcode } from "@/types/types";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = useQueryClient();

  const manager = useContext(ManagerContext);
  useAuth(manager as Manager);

  const [qrcode, setQRCode] = useState<Qrcode>();

  const getData = async () => {
    const qrCodeAsync = new Promise((resolve) => {
      const data = queryClient.getQueryData(["qrcode"]);
      if (data !== undefined) {
        resolve(data);
      }
    });
    const data: Qrcode | any = await qrCodeAsync;
    setQRCode(data)
  };
  getData();
  return <UserContext.Provider value={!qrcode ? "" : qrcode}>{children}</UserContext.Provider>;
};
