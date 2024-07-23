"use client";

import React, { createContext, useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";

export const MainContext = createContext({});

export const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<CurrentUser | null>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data as CurrentUser);
      } catch (error) {}
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const data = await fetchUserAttributes();
        setUserAttributes(data as UserAttributes);
      } catch (error) {}
    };
    getUserAttributes();
  }, [userAttributes]);

  const data: DataMainProvider = {
    user: user ?? null,
    userAttributes: userAttributes ?? null,
  };

  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};
