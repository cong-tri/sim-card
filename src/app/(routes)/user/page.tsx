/** @format */

import React from "react";
import UserProfile from "./_components/UserProfile";
import UserTransaction from "./_components/UserTransaction";
import { UserProvider } from "@/context/UserProvider";
import { ManagerProvider } from "@/context/ManagerProvider";
import { TransactionProvider } from "@/context/TransactionProvider";

export default async function UserPage() {
  return (
    <>
      <ManagerProvider>
        <UserProvider>
          <UserProfile />
        </UserProvider>
        
        <TransactionProvider>
          <UserTransaction />
        </TransactionProvider>
      </ManagerProvider>
    </>
  );
}
