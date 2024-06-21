/** @format */
"use client";

import React, { useState, useEffect } from "react";
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
import { getCookie } from "typescript-cookie";
import { logout } from "@/app/lib/authenticate";
import LogoutButton from "./LogoutButton";

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const [cookie, setCookie] = useState<any>(null);
  const [current, setCurrent] = useState<string>("signin");

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      let authenCookie: any = getCookie("Authenticate");
      authenCookie = authenCookie ? JSON.parse(authenCookie) : null;

      setCookie(authenCookie);
      setCurrent(authenCookie !== null ? "dashboard" : "signin");

      router.prefetch(pathName);
    }
  }, [router, pathName]);

  const logoutAction = async () => {
    const result: any = await logout();
    console.log(result);

    if (result.status === 200) {
      message.success(result.message);

      setCookie(null);
      setCurrent("signin");

      setTimeout(() => {
        router.push(result.path);
      }, 3000);
    } else {
      message.error(result.message);
      return;
    }
  };

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User Account",
      icon: <UserOutlined />,
      children: [
        cookie
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
                },
                {
                  key: "signout",
                  label: <LogoutButton logoutAction={logoutAction} />,
                  icon: <LogoutOutlined />,
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
    },
    {
      key: "product",
      label: <Link href={"/main/product"}>Product</Link>,
      icon: <ProductOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {    
    setCurrent(e.key);
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
