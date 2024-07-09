/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { SignInInput, getCurrentUser, signIn } from "aws-amplify/auth";
import { removeCookie, setCookie } from "typescript-cookie";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/amplifyconfiguration.json";
import { AmplifyOutputs } from "aws-amplify/adapter-core";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function SignInForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async ({ username, password }: SignInInput) => {
    try {
      const response = await signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      if (
        response.isSignedIn == true &&
        response.nextStep.signInStep === "DONE"
      ) {
        const currentUser = await getCurrentUser();

        setCookie("User", JSON.stringify(currentUser), {
          expires: 1,
          path: "/",
          secure: true
        });

        message.success("Login Successfully", 2, () => {
          router.refresh();
          router.push("/");
        });
      } else {
        message.error("Username or password is not correct", 2);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: 800 }}
      >
        <Title level={3}>Username:</Title>
        <Form.Item<FieldType>
          name="username"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={"+84326034561"}
        >
          <Input placeholder="+84326034561" size="large" />
        </Form.Item>

        <Title level={3}>Password:</Title>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue={"Tri@2024"}
        >
          <Input.Password placeholder="Tri@2024" size="large" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}