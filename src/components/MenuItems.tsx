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
import { getCurrentUser, signOut } from "aws-amplify/auth";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>({});
  const [current, setCurrent] = useState<string>(
    Object.keys(user).length != 0 ? pathname : "/signin"
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(!currentUser ? {} : currentUser);
        setCurrent(!currentUser ? "/signin" : pathname);
      } catch (error) {
        setUser({});
      }
    };

    fetchUser();
    router.refresh();
  }, [router, pathname]);

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User",
      icon: <UserOutlined />,
      children: Object.keys(user).length != 0
        ? [
          {
            key: "/user",
            label: <Link href={"/user"}>DashBoard User</Link>,
            icon: <ProfileOutlined />,
          },
          {
            key: "signout",
            label: "Sign Out",
            icon: <LogoutOutlined />,
          },
        ]
        : [
          {
            key: "/signin",
            label: <Link href={"/signin"}>Sign In</Link>,
            icon: <LoginOutlined />,
          },
        ],
    },
  ];

  const onClick: MenuProps["onClick"] = async (e) => {
    setCurrent(e.key);

    if (e.key == "signout") {
      await signOut({ global: true });

      setUser({});
      setCurrent("/signin");

      message.success("Log out success", 2, () => {
        router.refresh()
        router.push("/signin");
      });
    }
  };
  return (
    <Menu
      onClick={onClick}
      theme="light"
      mode="horizontal"
      selectedKeys={[current]}
      items={menuItems}
    />
  );
};

export default MenuItems;
