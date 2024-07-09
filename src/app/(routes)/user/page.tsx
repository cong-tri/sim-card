/** @format */

import React from "react";
import UserProfile from "./_components/UserProfile";
import UserTransaction from "./_components/UserTransaction";
import { UserProvider } from "@/context/UserProvider";
import { TransactionProvider } from "@/context/TransactionProvider";

export default function UserPage() {
  return (
    <>
      <UserProvider>
        <UserProfile />
      </UserProvider>
      
      <TransactionProvider>
        <UserTransaction />
      </TransactionProvider>
    </>
  );
}
