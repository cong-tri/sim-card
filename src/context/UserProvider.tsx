"use client";
import React, { createContext, useEffect, useState } from "react";
import useAuthSocket from "@/hook/socket/useAuthSocket";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(false);
  const [authQRCode, setAuthQRCode] = useState<any>({});

  const authSocket = useAuthSocket();

  useEffect(() => {
    authSocket?.on("connect", () => setIsConnected(true));

    if (authSocket?.connected) {
      setIsConnected(true);
    }

    authSocket?.emit("qrcode", (res: any) => {
      const qrcode: any = res?.qrcode;
      setAuthQRCode(qrcode);
      authSocket.disconnect()
    });
    
    authSocket?.on("disconnect", () => setIsConnected(false));

    return () => {
      authSocket?.off("connect", () => setIsConnected(false));
      authSocket?.off("disconnect", () => setIsConnected(false));
    };
  }, []);

  return (
    <UserContext.Provider value={authQRCode}>
      {children}
    </UserContext.Provider>
  );
};
