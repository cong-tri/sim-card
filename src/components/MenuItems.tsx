/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Amplify } from "aws-amplify";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import outputs from "@/amplify/amplifyconfiguration.json";
import { signOut } from "aws-amplify/auth";
import { getCookie, removeCookie } from "typescript-cookie";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [current, setCurrent] = useState<string>("dashboard");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== undefined) {
      let currentUser = getCookie("User");
      currentUser = !currentUser ? null : JSON.parse(currentUser);

      setUser(currentUser ? currentUser : null);
      setCurrent(pathname);
      
      // router.refresh();
    }
  }, [router, pathname]);

  const menuItems: MenuItem[] = [
    {
      key: "/",
      label: <Link href={"/"}>DashBoard</Link>,
      icon: <HomeOutlined />,
    },
    user
      ? {
          key: "account",
          label: "User",
          icon: <UserOutlined />,
          children: [
            {
              key: "/user",
              label: <Link href={"/user"}>DashBoard User</Link>,
              icon: <ProfileOutlined />,
            },
            {
              key: "/product",
              label: <Link href={"/product"}>Product</Link>,
              icon: <ProfileOutlined />,
            },
            {
              key: "signout",
              label: "Sign Out",
              icon: <LogoutOutlined />,
            },
          ],
        }
      : {
          key: "/signin",
          label: <Link href={"/signin"}>Sign In</Link>,
          icon: <LoginOutlined />,
        },
  ];

  const onClick: MenuProps["onClick"] = async (e) => {
    setCurrent(e.key);

    if (e.key == "signout") {
      await signOut({ global: true });
      removeCookie("User", { path: " ", secure: false });

      setUser(null);
      setCurrent("dashboard");

      message.success("Log out success", 2, () => router.push("/"));
    }
  };
  return (
    <Menu
      onClick={onClick}
      theme="dark"
      mode="horizontal"
      selectedKeys={[current]}
      items={menuItems}
    />
  );
};

export default MenuItems;
