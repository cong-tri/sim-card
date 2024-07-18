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
  const [dataMainContext, setDataMainContext] =
    useState<DataMainProvider | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (!data) return;
        else {
          if (!user) {
            setUser(data as CurrentUser);
          }
        }
      } catch (error) {}
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const data = await fetchUserAttributes();
        if (!data) return;
        else {
          if (!userAttributes) {
            setUserAttributes(data as UserAttributes);
          }
        }
      } catch (error) {}
    };
    getUserAttributes();
  }, [userAttributes]);

  useEffect(() => {
    if (!user || !userAttributes) return;
    else {
      const data: DataMainProvider = {
        user,
        userAttributes,
      };
      if (!dataMainContext) {
        setDataMainContext(data);
      }
    }
  }, [dataMainContext, user, userAttributes]);

  return (
    <MainContext.Provider value={!dataMainContext ? {} : dataMainContext}>
      {children}
    </MainContext.Provider>
  );
};
