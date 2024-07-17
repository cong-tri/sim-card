"use client";

import React, { createContext, useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { CurrentUser, UserAttributes } from "@/types/types";

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
        const currentUser = await getCurrentUser();
        setUser(!currentUser ? null: currentUser as CurrentUser);

        const userAttributes = !currentUser ? null : await fetchUserAttributes();
        setUserAttributes(!userAttributes ? null : (userAttributes as UserAttributes));
      } catch (error) {}
    };
    fetchUser();
  }, []);

  const data = {
    user: !user ? null : user,
    userAttributes: !userAttributes ? null : userAttributes,
  };
  
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};
