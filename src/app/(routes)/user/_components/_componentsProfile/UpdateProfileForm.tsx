/** @format */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import {
  CurrentUser,
  FieldTypeUpdateUser,
  UserAttributes,
} from "@/types/types";
import { MainContext } from "@/context/MainProvider";
import { fetchUserAttributes } from "aws-amplify/auth";

export default function UpdateProfileForm() {
  const [form] = useForm();

  const [user, setUser] = useState<CurrentUser>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes>();

  const dataMainContext: any = useContext(MainContext);

  useEffect(() => {
    if (!dataMainContext) {
      return;
    }
    setUser(dataMainContext as CurrentUser);
  }, [dataMainContext]);

  useEffect(() => {
    const getUserAttributes = async () => {
      const data = await fetchUserAttributes();

      if (!data) return;
      else {
        if (!userAttributes) {
          setUserAttributes(data as UserAttributes);
        }
      }
    };
    getUserAttributes();
  }, [userAttributes]);

  if (!userAttributes || !user) {
    return;
  }

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      style={{ width: "100%" }}
    >
      <Row align={"middle"} gutter={16}>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>UserId:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="userId"
            style={{ width: "100%" }}
            rules={[
              {
                type: "string",
                message: "Please enter an id with format string.",
              },
            ]}
            initialValue={user?.userId as string}
          >
            <Input placeholder="your id" size="middle" disabled />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Username:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="username"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your username!" }]}
            initialValue={user?.username as string}
          >
            <Input placeholder="your username" size="middle" disabled />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Email Address:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="email"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "string",
                message: "Please input the correct format email",
              },
            ]}
            initialValue={userAttributes?.email}
          >
            <Input placeholder="your email" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>First Name:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="family_name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your first name!" },
              {
                type: "string",
                message: "Please input the correct format name",
              },
            ]}
            initialValue={userAttributes?.family_name as string}
          >
            <Input placeholder="your family name" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Last Name:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="given_name"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            initialValue={userAttributes?.given_name as string}
          >
            <Input placeholder="your given name" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Phone Number:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="phone_number"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                type: "string",
                message: "Please input the correct format phone number",
              },
            ]}
            initialValue={userAttributes?.phone_number as string}
          >
            <Input placeholder="your cellphone number" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Zone Info:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="zoneinfo"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your zone info!" },
            ]}
            initialValue={userAttributes?.zoneinfo as string}
          >
            <Input placeholder="your city" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Country:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="locale"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your locale!" }]}
            initialValue={userAttributes?.locale}
          >
            <Input placeholder="your locale" size="middle" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
}
