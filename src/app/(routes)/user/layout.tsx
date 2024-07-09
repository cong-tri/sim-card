/** @format */
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ManagerProvider } from "@/context/ManagerProvider";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ManagerProvider>{children}</ManagerProvider> */}
        {children}
      </QueryClientProvider>
    </>
  );
}
