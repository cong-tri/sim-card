/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { setCookie } from "typescript-cookie";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function SignInForm({ authenticate }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    const response:any = await authenticate(username, password);
    console.log(response);

    if (response.status == 200) {
      message.success(response.message);

      setCookie("Authenticate", JSON.stringify(response.session));
    
      setTimeout(() => {
        router.push(response.path);
      }, 1000);
    } else {
      message.error(response.message);
      return;
    }
  };

  return (
    <>
      <Form
        form={form}
        name='basic'
        onFinish={onFinish}
        autoComplete='off'
        style={{ width: 800 }}>
        <Title level={3}>Username:</Title>
        <Form.Item<FieldType>
          name='username'
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder='congtri' size='large' />
        </Form.Item>

        <Title level={3}>Password:</Title>
        <Form.Item<FieldType>
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder='12345' size='large' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
