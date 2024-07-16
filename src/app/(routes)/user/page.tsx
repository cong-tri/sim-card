/** @format */

import React from "react";
import UserProfile from "./_components/UserProfile";
import UserTransaction from "./_components/UserTransaction";
import { UserProvider } from "@/context/UserProvider";
import { TransactionProvider } from "@/context/TransactionProvider";
import { ManagerProvider } from "@/context/ManagerProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

export default async function UserPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["qrcode"],
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ManagerProvider>
          <UserProvider>
            <UserProfile />
          </UserProvider>

          {/* <TransactionProvider>
        <UserTransaction />
      </TransactionProvider> */}
        </ManagerProvider>
      </HydrationBoundary>
    </>
  );
}
