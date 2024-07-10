// "use client";

import React from "react";
import { Avatar, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import UpdateProfileForm from "./_componentsProfile/UpdateProfileForm";
import QRCodeVendor from "./_componentsProfile/QRCodeVendor";

export default function UserProfile() {
  return (
    <>
      <Row
        className="w-full px-14"
        gutter={30}
        align={"top"}
        justify={"center"}
      >
        <Col xs={24} lg={16} className="border-2 rounded-2xl py-10 px-4">
          <div className="rounded-2xl bg-blue-500 p-4 mb-5">
            <Title level={2} className="pb-2 mb-0">
              Edit Profile
            </Title>
            <Title level={4} className="m-0">
              Complete Your Profile
            </Title>
          </div>
          <UpdateProfileForm />
        </Col>
        <Col xs={24} lg={8}>
          <div className="border-2 rounded-2xl py-14 text-center ">
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={4} className="mt-5 font-normal">
              Vendor
            </Title>
            <Title level={4}>Đào Công Trí</Title>
            <QRCodeVendor /><br />
            <Button type="primary" htmlType="button" className="mt-5">
              Follow
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
