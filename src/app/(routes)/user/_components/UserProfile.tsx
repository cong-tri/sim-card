"use client";

import React from "react";
import { Avatar, Button, Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import QRCodeVendor from "./QRCodeVendor";
import { useMainContext } from "@/context/MainProvider";

const { Text } = Typography;

export default function UserProfile() {

  const { user, userAttributes } = useMainContext();

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
                UserId: <Text>{user?.userId}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Username: <Text>{user?.username}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Email Address: <Text>{userAttributes?.email}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                First Name: <Text>{userAttributes?.family_name}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Last Name: <Text>{userAttributes?.given_name}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Phone Number:{" "}
                <Text>{userAttributes?.phone_number}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Zone Info: <Text>{userAttributes?.zoneinfo}</Text>
              </Title>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Title level={4}>
                Locale: <Text>{userAttributes?.locale}</Text>
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
              {userAttributes?.given_name}{" "}
              {userAttributes?.family_name}
            </Title>
            <QRCodeVendor />
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
