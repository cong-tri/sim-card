"use client";

import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context/MainProvider";
import { CurrentUser, DataMainProvider, UserAttributes } from "@/types/types";
import { Avatar, Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import UpdateProfileForm from "./_componentsProfile/UpdateProfileForm";
import QRCodeVendor from "./_componentsProfile/QRCodeVendor";

export default function UserProfile() {
  const dataMainContext = useContext(MainContext);

  const [userAttributes, setUserAttributes] = useState<UserAttributes>();
  const [user, setUser] = useState<CurrentUser>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!dataMainContext) return;
      else {
        const data = dataMainContext as DataMainProvider;
        if (!data.user) return;
        else setUser(data.user);
      }
    };

    fetchUser();
  }, [dataMainContext]);

  useEffect(() => {
    const getUserAttributes = async () => {
      if (!dataMainContext) return;
      else {
        const data = dataMainContext as DataMainProvider;
        if (!data.userAttributes) return;
        else setUserAttributes(data.userAttributes);
      }
    };
    getUserAttributes();
  }, [dataMainContext]);

  if (!userAttributes || !user) {
    return;
  }
  const props: DataMainProvider = {
    user: user ? user : null,
    userAttributes: userAttributes ? userAttributes : null,
  };
  return (
    <>
      <Row
        className="w-full px-14 mt-10"
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
          <UpdateProfileForm props={props} />
        </Col>
        <Col xs={24} lg={8}>
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
