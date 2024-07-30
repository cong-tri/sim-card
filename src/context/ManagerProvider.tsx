"use client"

import { manager } from "@/hooks/socket/useManager";
import { createContext, useContext } from "react";
import { Manager } from "socket.io-client";

const ManagerContext = createContext({} as {manager?: Manager});

export const ManagerProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <ManagerContext.Provider value={{manager}}>
        {children}
      </ManagerContext.Provider>
    );
  };

export const useManagerContext = () =>  useContext(ManagerContext)