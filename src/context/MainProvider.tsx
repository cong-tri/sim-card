"use client";

import React, { createContext, useContext } from "react";

import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";

const MainContext = createContext({} as { data?: DataMainProvider });

export const MainProvider = ({
  children,
  currentUser,
  userAttributes,
}: {
  children: React.ReactNode;
  currentUser: CurrentUser | undefined;
  userAttributes: UserAttributes | undefined;
}) => {

  const data: DataMainProvider = {
    currentUser,
    userAttributes,
  };

  return (
    <MainContext.Provider value={{ data }}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
