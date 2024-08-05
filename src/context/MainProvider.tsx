"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";

const MainContext = createContext({} as { data?: DataMainProvider });

export const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<CurrentUser | null>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>();

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       setUser(currentUser as CurrentUser);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUser();
  // }, [user]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await fetchUserAttributes();
  //       setUserAttributes(user as UserAttributes);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUser();
  // }, [userAttributes]);

  const data: DataMainProvider = {
    user: user ?? null,
    userAttributes: userAttributes ?? null,
  };

  return (
    <MainContext.Provider value={{ data }}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
