/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Amplify } from "aws-amplify";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import outputs from "@/amplify/amplifyconfiguration.json";
import { signOut } from "aws-amplify/auth";
import { useMainContext } from "@/context/MainProvider";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type MenuItem = Required<MenuProps>["items"][number];

const MenuItems: React.FC = () => {
  const { data } = useMainContext();

  const router = useRouter();
  const pathname = usePathname();

  const currentPath = pathname.replace("/", "");

  const [current, setCurrent] = useState<string>(
    !data?.user ? "signin" : currentPath
  );

  useEffect(() => {
    setCurrent(!data?.user ? "signin" : currentPath);
    router.refresh();
  }, [currentPath, router, data]);

  const menuItems: MenuItem[] = [
    {
      key: "account",
      label: "User",
      icon: <UserOutlined />,
      children: !data?.user
        ? [
            {
              key: "signin",
              label: <Link href={"/signin"}>Sign In</Link>,
              icon: <LoginOutlined />,
            },
          ]
        : [
            {
              key: "user",
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
      setCurrent("signin");
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
