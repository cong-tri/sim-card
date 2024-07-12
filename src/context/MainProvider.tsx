"use client";

import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

export const MainContext = createContext({});

export const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(!currentUser ? {} : currentUser);
      } catch (error) {
      }
    };
    fetchUser();
  }, []);
  return <MainContext.Provider value={user}>{children}</MainContext.Provider>;
};
