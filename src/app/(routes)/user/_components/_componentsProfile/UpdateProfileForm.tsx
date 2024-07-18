/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "antd/es/form/Form";
import { CurrentUser, DataMainProvider, FieldTypeUpdateUser, UserAttributes } from "@/types/types";

export default function UpdateProfileForm({ props }: any) {
  const [form] = useForm();

  const [userAttributes, setUserAttributes] = useState<UserAttributes>();
  const [user, setUser] = useState<CurrentUser>();
  useEffect(() => {
    if (!props) return
    else{
      const data = props as DataMainProvider;
      if (!data.user || !data.userAttributes) return
      else {
        setUser(data.user)  
        setUserAttributes(data.userAttributes)
      }
    }
      
  }, [props])
  
  if (!user || !userAttributes) return;

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
            initialValue={user?.userId ?? ""}
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
            initialValue={user?.username ?? ""}
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
            initialValue={userAttributes?.email ?? ""}
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
            initialValue={userAttributes?.family_name ?? ""}
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
            initialValue={userAttributes?.given_name ?? ""}
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
            initialValue={userAttributes?.phone_number ?? ""}
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
            initialValue={userAttributes?.zoneinfo ?? ""}
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
            initialValue={userAttributes?.locale ?? ""}
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
