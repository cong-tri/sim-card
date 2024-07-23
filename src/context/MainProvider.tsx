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
  const [dataMainContext, setDataMainContext] = useState<
    DataMainProvider | {}
  >();

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
        if (!user) return;

        const data = await fetchUserAttributes();
        setUserAttributes(data as UserAttributes);
      } catch (error) {}
    };
    getUserAttributes();
  }, [user, userAttributes]);

  useEffect(() => {
    if (!user || !userAttributes) return;

    const data: DataMainProvider = {
      user,
      userAttributes,
    };
    setDataMainContext(data);
  }, [user, userAttributes]);

  return (
    <MainContext.Provider value={dataMainContext ?? {}}>
      {children}
    </MainContext.Provider>
  );
};
