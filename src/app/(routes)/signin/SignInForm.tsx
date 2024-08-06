/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/amplifyconfiguration.json";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import { SignInOutput, confirmSignIn, signIn } from "aws-amplify/auth";
import { FieldTypeSignin } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import Typography from "antd/es/typography/Typography";

Amplify.configure(outputs as AmplifyOutputs, { ssr: true });

type Account = {
  username: string;
  password: string;
};

export default function SignInForm() {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [uuid, setUUID] = useState<string>();
  const [account, setAccount] = useState<Account>();
  const [output, setOutPut] = useState<SignInOutput>();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (isModalOpen !== true) return;

    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isModalOpen]);

  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const myuuid = uuidv4(); // uuid device
    setUUID(myuuid);

    setAccount({ username, password });

    try {
      const response = await signIn({
        username,
        password,
        options: {
          clientMetadata: {
            uuid: myuuid,
          },
        },
      });
      console.log(response);
      setOutPut(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      message.error(
        "You have already logged in another device. Please LOG OUT all of devices and try it again!",
        () => setIsModal(true)
      );
    }
  };

  const handleContinueToSignin = async () => {
    console.log("account >>", account);
    try {
      const response = await signIn({
        username: account?.username ?? "",
        password: account?.password,
        options: {
          clientMetadata: {
            uuid: uuid ?? "",
            mfaMethod: "EMAIL",
          },
        },
      });
      if (response.isSignedIn === false) {
        setOutPut(response);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInNextSteps = async ({ otpCode }: { otpCode: string }) => {
    if (output?.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE") {
      try {
        await confirmSignIn({ challengeResponse: otpCode });
        setValid(true);

        message.success("Login Successfully", 2, () => {
          router.refresh();
          router.push("/user");
        });
      } catch (error) {
        console.error(error);
        message.error(
          "Invalid OTP code! Please enter the latest and correct OTP code!",
          2
        );
      }
    }
  };

  const handleResendOTPCode = async () => {
    try {
      await signIn({
        username: account?.username ?? "",
        password: account?.password,
        options: {
          clientMetadata: {
            uuid: uuid ?? "",
            mfaMethod: "EMAIL",
          },
        },
      });
      setTimeLeft(30);
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
        <Form.Item<FieldTypeSignin>
          name="username"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={"+84326034561"}
        >
          <Input placeholder="Your username" size="large" />
        </Form.Item>

        <Title level={3}>Password:</Title>
        <Form.Item<FieldTypeSignin>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue={"Tri@2024"}
        >
          <Input.Password placeholder="Your password" size="large" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title={<Title level={3}>Sign In Failed</Title>}
        centered
        width={300}
        open={isModal}
        onOk={() => setIsModal(true)}
        onCancel={() => {
          if (!valid) {
            message.error("Please submit the OTP code to close");
            return;
          }
          setIsModal(false);
        }}
        footer={
          <>
            <Button
              htmlType="button"
              type="primary"
              danger
              onClick={() => setIsModal(false)}
            >
              Close
            </Button>
            <Button
              htmlType="button"
              type="primary"
              onClick={() => handleContinueToSignin()}
            >
              CONTINUE
            </Button>
          </>
        }
      >
        <Typography>
          You have already logged in on another device. Please sign out of the
          other device or CONTINUE
        </Typography>
      </Modal>

      <Modal
        title={<Title type="secondary">Verification</Title>}
        centered
        width={350}
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => {
          if (!valid) {
            message.error("Please submit the OTP code to close");
            return;
          }
          setIsModalOpen(false);
        }}
        footer={
          <>
            <Button
              htmlType="button"
              type="primary"
              danger
              disabled={!valid}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </>
        }
      >
        <Form
          form={form}
          name="otp"
          onFinish={handleSignInNextSteps}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <Title level={4}>
            Please, enter the verification code that has been sent to your email
          </Title>
          <Form.Item
            name="otpCode"
            hasFeedback
            validateStatus="success"
            rules={[
              {
                required: true,
                message: "Please enter the OTP code before submit!",
              },
            ]}
          >
            <Input.OTP />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full"
              type="primary"
              size="large"
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              className="w-full mt-5"
              type="default"
              size="large"
              disabled={timeLeft == 0 ? false : true}
              onClick={() => handleResendOTPCode()}
            >
              Resend OTP Code ({timeLeft ?? ""})
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
