/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MenuItems from "@/components/MenuItems";
import "./_styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sim Card",
  description: "Generated by web team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <MenuItems />
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
