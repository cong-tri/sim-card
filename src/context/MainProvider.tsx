"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";

const MainContext = createContext({} as { user?: CurrentUser, userAttributes?: UserAttributes });

export const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<CurrentUser | null>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>();

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (!data) return;
        setUser(data as CurrentUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  useEffect(() => {
    fetchUserAttributes()
      .then((data) => {
        if (!data) return;
        setUserAttributes(data as UserAttributes)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userAttributes]);

  return (
    <MainContext.Provider value={{ user: user ?? undefined, userAttributes: userAttributes ?? undefined }}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
