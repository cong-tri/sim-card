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
  ProductOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signOut } from "aws-amplify/auth";
import { getCookie, removeCookie } from "typescript-cookie";

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [current, setCurrent] = useState<string>("signin");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== undefined) {

      let currentUser = getCookie("User");
      currentUser = !currentUser ? null : JSON.parse(currentUser);
      
      setUser(currentUser ? currentUser : null);
      setCurrent(currentUser ? pathname.replace("/main/", "") : "signin")

      router.refresh()
    }
  }, [router, pathname]);

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User Account",
      icon: <UserOutlined />,
      children: [
        user
          ? {
              label: "Settings",
              type: "group",
              children: [
                {
                  key: "vendorProfile",
                  label: (
                    <Link href={"/main/vendorProfile"}>Vendor Profile</Link>
                  ),
                  icon: <ProfileOutlined />,
                  disabled: !user ? true : false,
                },
                {
                  key: "signout",
                  label: "Sign Out",
                  icon: <LogoutOutlined />,
                  disabled: !user ? true : false,
                },
              ],
            }
          : {
              key: "signin",
              label: <Link href={"/main/signin"}>Sign In</Link>,
              icon: <LoginOutlined />,
            },
      ],
    },
    {
      key: "dashboard",
      label: <Link href={"/main/dashboard"}>DashBoard</Link>,
      icon: <HomeOutlined />,
      disabled: !user ? true : false,
    },
    {
      key: "product",
      label: <Link href={"/main/product"}>Product</Link>,
      icon: <ProductOutlined />,
      disabled: !user ? true : false,
    },
  ];

  const onClick: MenuProps["onClick"] = async (e) => {
    setCurrent(e.key);

    if (e.key == "signout") {

      await signOut({ global: true });
      removeCookie("User", {path: '/main', secure: false})

      setUser(null)
      setCurrent("signin");

      message.success("Log out success", 2, () => router.push("/main/signin"));
    }
  };
  return (
    <Menu
      onClick={onClick}
      theme="dark"
      mode="inline"
      selectedKeys={[current]}
      items={menuItems}
    />
  );
};

export default MenuItems;
