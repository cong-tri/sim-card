"use client";

import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context/MainProvider";
import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";
import { Avatar, Button, Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import QRCodeVendor from "./QRCodeVendor";

const { Text } = Typography;
export default function UserProfile() {
  const dataMainContext = useContext(MainContext);

  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>();
  const [user, setUser] = useState<CurrentUser | null>();

  useEffect(() => {
    if (!dataMainContext) return;

    const data = dataMainContext as DataMainProvider;
    if (!data.user || !data.userAttributes) return;

    setUser(data.user);
    setUserAttributes(data.userAttributes);
  }, [dataMainContext, user, userAttributes]);

  if (!user || !userAttributes) return;

  const props: DataMainProvider = {
    user,
    userAttributes,
  };
  return (
    <>
      <Row
        className="w-full px-14 mt-10"
        gutter={30}
        align={"top"}
        justify={"center"}
      >
        <Col xs={24} lg={18} className="border-2 rounded-2xl py-10 px-4">
          <div className="rounded-2xl bg-blue-500 p-4 mb-5">
            <Title level={2} className="pb-2 mb-0">
              Information
            </Title>
          </div>
          <Row align={"top"} gutter={16}>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                UserId: <Text>{user?.userId ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Username: <Text>{user?.username ?? ""}</Text>{" "}
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Email Address: <Text>{userAttributes?.email ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                First Name: <Text>{userAttributes?.family_name ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Last Name: <Text>{userAttributes?.given_name ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Phone Number: <Text>{userAttributes?.phone_number ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Zone Info: <Text>{userAttributes?.zoneinfo ?? ""}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Locale: <Text>{userAttributes?.locale ?? ""}</Text>
              </Title>
            </Col>
          </Row>
        </Col>
        <Col xs={24} lg={6}>
          <div className="border-2 rounded-2xl py-14 text-center ">
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={4} className="mt-5 font-normal">
              Vendor
            </Title>
            <Title level={4}>
              {userAttributes?.family_name} {userAttributes?.given_name}
            </Title>
            <QRCodeVendor props={props} />
            <br />
            <Button type="primary" htmlType="button" className="mt-5">
              Follow
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
