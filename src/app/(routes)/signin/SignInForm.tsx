/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/amplifyconfiguration.json";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import { SignInInput, signIn, signOut } from "aws-amplify/auth";
import { FieldTypeSignin } from "@/types/types";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

export default function SignInForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async ({ username, password }: SignInInput) => {
    try {
      const response = await signIn({
        username,
        password,
        options: {
          clientMetadata: {
            uuid: "tesst",
          },
        },
      });
      
      if (
        response.isSignedIn == true &&
        response.nextStep.signInStep === "DONE"
      ) {
        message.success("Login Successfully", 2, () => {
          router.refresh();
          router.push("/user");
        });
      } else {
        message.error("Username or password is not correct", 2);
      }
    } catch (error) {
      console.error(error);
      message.error(
        "Please log out other advices. Please reset and try it again!"
      );
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
        <Form.Item<FieldTypeSignin>
          name="username"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={"+84326034561"}
        >
          <Input placeholder="+84326034561" size="large" />
        </Form.Item>

        <Title level={3}>Password:</Title>
        <Form.Item<FieldTypeSignin>
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
