/** @format */
"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { MainContext } from "@/context/MainProvider";
import { CurrentUser, DataMainProvider } from "@/types/types";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const dataMainContext = useContext(MainContext);

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | {}>({});
  const [current, setCurrent] = useState<string>(!user ? "/signin" : pathname);

  useEffect(() => {
    const fetchUser = async () => {
      if (!dataMainContext) {
        return;
      } else {
        const data = dataMainContext as DataMainProvider;
        setUser(!data.user ? {} : data.user);
        setCurrent(!data.user ? "/signin" : pathname);
      }
    };
    fetchUser();

    router.refresh();
    router.push(pathname);
  }, [router, pathname, dataMainContext]);

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User",
      icon: <UserOutlined />,
      children:
        Object.keys(user).length === 0
          ? [
              {
                key: "/signin",
                label: <Link href={"/signin"}>Sign In</Link>,
                icon: <LoginOutlined />,
              },
            ]
          : [
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
        router.refresh();
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
