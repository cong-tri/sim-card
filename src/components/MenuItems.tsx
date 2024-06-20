/** @format */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  ProductOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCookie } from "typescript-cookie";

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  let cookie: any = getCookie("Authenticate");
  cookie = cookie ? JSON.parse(cookie) : null;

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User Account",
      icon: <UserOutlined />,
      children: [
        cookie
          ? {
              key: "setting",
              label: "Settings",
              type: "group",
              children: [
                {
                  key: "vendorProfile",
                  label: <Link href={"/vendorProfile"}>Vendor Profile</Link>,
                  icon: <ProfileOutlined />,
                },
              ],
            }
          : {
              key: "signin",
              label: <Link href={"/signin"}>Sign In</Link>,
              icon: <LoginOutlined />,
            },
      ],
    },
    {
      key: "dashboard",
      label: <Link href={"/dashboard"}>DashBoard</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "product",
      label: <Link href={"/product"}>Product</Link>,
      icon: <ProductOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const [current, setCurrent] = useState(
    cookie !== null ? "dashboard" : "signin"
  );

  return (
    <Menu
      onClick={onClick}
      theme='dark'
      mode='inline'
      selectedKeys={[current]}
      items={menuItems}
    />
  );
};

export default MenuItems;
