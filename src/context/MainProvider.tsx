"use client";

import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { CurrentUser } from "@/types/types";

export const MainContext = createContext({});

export const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<CurrentUser | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(!currentUser ? null: currentUser as CurrentUser);
      } catch (error) {}
    };
    fetchUser();
  }, []);
  return <MainContext.Provider value={user ? user : {}}>{children}</MainContext.Provider>;
};
