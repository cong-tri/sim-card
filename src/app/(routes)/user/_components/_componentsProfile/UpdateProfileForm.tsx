/** @format */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import {
  CurrentUser,
  DataMainProvider,
  FieldTypeUpdateUser,
  UserAttributes,
} from "@/types/types";
import { MainContext } from "@/context/MainProvider";

export default function UpdateProfileForm() {
  const [user, setUser] = useState<CurrentUser>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>();
  
  const dataMainContext = useContext(MainContext);

  useEffect(() => {
    const getDataMainContext = async (dataMainContext: DataMainProvider) => {
      const userAsync: Promise<CurrentUser> = new Promise((resolve) => {
        if (dataMainContext.user) {
          resolve(dataMainContext.user);
        }
      });
      const data = await userAsync;
      setUser(data);
    };
    getDataMainContext(dataMainContext as DataMainProvider);
  }, [dataMainContext]);

  // useEffect(() => {
  //   const getDataMainContext = async (dataMainContext: DataMainProvider) => {
  //     const userAttributesAsync: Promise<UserAttributes> = new Promise((resolve) => {
  //       if (dataMainContext?.userAttributes) {
  //         resolve(dataMainContext?.userAttributes);
  //       }
  //     });
  //     const userAttributes = await userAttributesAsync;
  //     console.log(userAttributes);
  //     setUserAttributes(userAttributes)
  //   };
  //   getDataMainContext(dataMainContext as DataMainProvider);
  // }, [dataMainContext])

  const onFinish = (values: any) => {
    console.log(values);
  };

  const [form] = useForm();
  return (
    <Form
      // form={form}
      name="update"
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
            rules={[{ type: "string" }]}
            initialValue={user?.userId as string}
            
          >
            <Input placeholder="" size="middle" disabled />
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
            <Input placeholder="your username" size="middle" />
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
            initialValue={`${userAttributes?.email}`}
          >
            <Input placeholder="your email" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>First Name:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="firstName"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            initialValue={userAttributes?.family_name as string}
          >
            <Input placeholder="your first name" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Last Name:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="lastName"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            initialValue={userAttributes?.given_name as string}
          >
            <Input placeholder="your last name" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Phone Number:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="phoneNumber"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please input your cellphone number!",
              },
              {
                type: "string",
                message: "Please input the correct format cellphone number",
              },
            ]}
            initialValue={userAttributes?.phone_number as string}
          >
            <Input placeholder="your cellphone number" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>City:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="city"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your city!" }]}
            initialValue={"Ho Chi Minh City"}
          >
            <Input placeholder="your city" size="middle" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Title level={4}>Country:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="country"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your country!" }]}
            initialValue={"Viet Nam"}
          >
            <Input placeholder="your country" size="middle" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Title level={4}>About:</Title>
          <Form.Item<FieldTypeUpdateUser>
            name="description"
            style={{ width: "100%" }}
          >
            <TextArea
              rows={5}
              maxLength={300}
              allowClear
              placeholder="Enter something about you"
            />
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
