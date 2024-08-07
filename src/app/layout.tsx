/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { MainProvider } from "@/context/MainProvider";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import MenuItems from "@/components/MenuItems";


import { runWithAmplifyServerContext } from "@/amplify/utils/amplifyServerUtils";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth/server";

import { CurrentUser, UserAttributes } from "@/types/types";

import "./_styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sim Card",
  description: "Generated by web team",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getUserServer = async () => {
    try {
      const currentUser = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => getCurrentUser(contextSpec),
      });

      const userAttributes = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => fetchUserAttributes(contextSpec),
      });

      return { currentUser, userAttributes };
    } catch (error) {
      return;
    }
  };
  const data = await getUserServer();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <AntdRegistry>
            <MainProvider
              currentUser={data?.currentUser as CurrentUser}
              userAttributes={data?.userAttributes as UserAttributes}
            >
              <MenuItems />
              {children}
            </MainProvider>
          </AntdRegistry>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
