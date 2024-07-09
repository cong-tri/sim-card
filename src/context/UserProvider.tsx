"use client";
import React, { createContext, useEffect, useState } from "react";
import useAuthSocket from "@/hook/socket/useAuthSocket";
import { getCookie } from "typescript-cookie";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(false);
  const [authQRCode, setAuthQRCode] = useState<any>({});

  const [idToken, setIdToken] = useState<string>("")

  const authSocket = useAuthSocket(idToken !== "" ? idToken : "");

  useEffect(() => {
    setIdToken(getCookie("CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.idToken") as string)
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
  }, [idToken]);

  return (
    <UserContext.Provider value={authQRCode}>
      {children}
    </UserContext.Provider>
  );
};
