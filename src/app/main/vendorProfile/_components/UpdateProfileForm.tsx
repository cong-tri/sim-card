/** @format */
"use client";

import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";

type FieldType = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  postalCode?: number;
  description?: string;
};

export default function UpdateProfileForm() {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const [form] = useForm();
  return (
    <Form
      form={form}
      name='basic'
      autoComplete='off'
      onFinish={onFinish}
      style={{ width: "100%" }}>
      <Row align={"middle"} gutter={16}>
        <Col span={8}>
          <Title level={4}>ID:</Title>
          <Form.Item<FieldType>
            name='id'
            style={{ width: "100%" }}
            initialValue={1}>
            <Input placeholder='your ID' size='middle' disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Username:</Title>
          <Form.Item<FieldType>
            name='username'
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your username!" }]}
            initialValue={"congtri"}>
            <Input placeholder='your username' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Email Address:</Title>
          <Form.Item<FieldType>
            name='email'
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please input the correct format email",
              },
            ]}
            initialValue={"congtri@gmail.com"}>
            <Input placeholder='your email' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>First Name:</Title>
          <Form.Item<FieldType>
            name='firstName'
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            initialValue={"dao cong"}>
            <Input placeholder='your first name' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Last Name:</Title>
          <Form.Item<FieldType>
            name='lastName'
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            initialValue={"tri"}>
            <Input placeholder='your last name' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Phone Number:</Title>
          <Form.Item<FieldType>
            name='phoneNumber'
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
            initialValue={"0326034561"}>
            <Input placeholder='your cellphone number' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>City:</Title>
          <Form.Item<FieldType>
            name='city'
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your city!" }]}
            initialValue={"Ho Chi Minh City"}>
            <Input placeholder='your city' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Country:</Title>
          <Form.Item<FieldType>
            name='country'
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your country!" }]}
            initialValue={"Viet Nam"}>
            <Input placeholder='your country' size='middle' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Title level={4}>Postal Code:</Title>
          <Form.Item<FieldType>
            name='postalCode'
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Please input your postal code!" },
              {
                type: "number",
                message: "Please input the correct format postal code",
              },
            ]}
            initialValue={12345678}>
            <Input placeholder='your postal code' size='middle' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Title level={4}>About:</Title>
          <Form.Item<FieldType> name='description' style={{ width: "100%" }}>
            <TextArea
              rows={5}
              maxLength={300}
              allowClear
              placeholder='Enter something about you'
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button htmlType='submit' type='primary'>
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
}
