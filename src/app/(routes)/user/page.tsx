/** @format */

import React from "react";
import { cookies } from "next/headers";

import UserProfile from "./_components/UserProfile";
import UserTransaction from "./_components/UserTransaction";

import { UserProvider } from "@/context/UserProvider";
import { ManagerProvider } from "@/context/ManagerProvider";

export default function UserPage() {

  return (
    <>
      <ManagerProvider>
        <UserProvider>
          <UserProfile />
          <UserTransaction />
        </UserProvider>
      </ManagerProvider>
    </>
  );
}
