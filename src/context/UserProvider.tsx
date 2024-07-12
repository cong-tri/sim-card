"use client";
import React, { createContext, useEffect, useState } from "react";
import useAuthSocket from "@/hooks/socket/useAuthSocket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const UserContext = createContext({});

export const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const eventName: string = "qrcode";

  // const [authQRCode, setAuthQRCode] = useState<any>({});
  const [idToken, setIdToken] = useState<string>("");
  // const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getSession = async () => {
      try {
        const session: any | undefined = await fetchAuthSession();
        const token: string | undefined = session.tokens?.idToken?.toString();
        setIdToken(!token ? "" : token);
      } catch (error) {
        console.error(error);
      }
    };
    getSession();
  }, [idToken]);

  useAuthSocket(idToken, eventName);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser(!currentUser ? null : currentUser);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return <UserContext.Provider value={''}>{children}</UserContext.Provider>;
};
