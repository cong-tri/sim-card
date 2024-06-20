/** @format */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  ProductOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCookie } from "typescript-cookie";

const MenuItems: React.FC = () => {
  const [cookie, setCookie] = useState<any>(null);
  const [current, setCurrent] = useState<string>("signin");

  useEffect(() => {
    if (typeof document !== "undefined") {
      let authenCookie: any = getCookie("Authenticate");
      authenCookie = authenCookie ? JSON.parse(authenCookie) : null;
      setCookie(authenCookie);
      setCurrent(authenCookie !== null ? "dashboard" : "signin");
    }
  }, []);


  const menuItems = [
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
  ]

  const onClick = (e) => {
    setCurrent(e.key);
  };
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
