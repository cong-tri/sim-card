"use client"

import { manager } from "@/hooks/socket/useManager";
import { createContext } from "react";

export const ManagerContext = createContext({});

export const ManagerProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <ManagerContext.Provider value={manager}>
        {children}
      </ManagerContext.Provider>
    );
  };
  