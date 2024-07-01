/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { SignInInput, getCurrentUser, signIn } from "aws-amplify/auth";
import { removeCookie, setCookie } from "typescript-cookie";

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
        // removeCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.accessToken",
        //   { path: "/", secure: false }
        // );
        // removeCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.idToken",
        //   { path: "/", secure: false }
        // );

        // setCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.accessToken",
        //   "ABC",
        //   { path: "/", secure: true, expires: 2 }
        // );
        // setCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.idToken",
        //   "ABC",
        //   { path: "/", secure: true, expires: 2 }
        // );

        // setCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.idToken",
        //   "eyJraWQiOiJZSVNMUytwdTgxRGxhTnd6UGhwbGdcL0o4KzRuRytXUTlcL1JLUlhOODB4S3c9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0YmQ2MzU1ZC05ZmQ5LTQ4NTItYjZmYy05MTA3NmRiOGU4NDkiLCJjb2duaXRvOmdyb3VwcyI6WyJtZXJjaGFudCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2p2ZUhmc0o1WSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InYtci0xNzE4OTU1MTkyNTUwIiwiZ2l2ZW5fbmFtZSI6IlRyaSIsIm9yaWdpbl9qdGkiOiIxNWYyY2NmZS1iZDZmLTQ0YjMtOGRjMC04OThhZDFjYTRkZjYiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo4Nzk2ODU0MDc1NjA6cm9sZVwvZGV2LWNjcy1hdXRoLVVzZXJBdXRoUm9sZS1JMVBNMEtUSUc5RlEiXSwiYXVkIjoiNXVrNGRjMnE3NmYzYXFpNmxnb3RhY2QxOTUiLCJldmVudF9pZCI6IjEyYWNlMWI4LTMyNDAtNGJmMi04ZTQ3LWFkZTdiN2NkMzNiZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzE5ODA1ODEzLCJwaG9uZV9udW1iZXIiOiIrODQzMjYwMzQ1NjEiLCJleHAiOjE3MTk4MTMwMTMsImlhdCI6MTcxOTgwNTgxMywiZmFtaWx5X25hbWUiOiJEYW8gQ29uZyIsImp0aSI6ImIyZDBlZjE4LTExZTYtNGY1YS04ODBlLWM0OTA0YWEwZjA3NSIsImVtYWlsIjoiZGFvY29uZ3RyaTIwMDMxNjA5QGdtYWlsLmNvbSJ9.t7qkn0tgwTcGY668BTwULdqt6QmVyqGZVwR8k_7I120JTzrX0DVbFZrr5NMAntggg6FB-pNnA-Dk7PsbSDW6X7jaNs2ICGDOBmEsnXhLl9Enxx2s-K6Mrx1iA5XJSoU_1im-MhRDq6tkhPmm1RC6Lm2gXWCMmqlApRBS-wlPfUQqh7V5B2uU41a2LId0jr4gXbGVV7NpTuzJpjyuI2GSdmgQOCi6q8GC57Y0DFsiOlhqpK0Ie-TDuFnNfV1ws5ltT9r3aQZsNuuwxuWzY-ryzZuu3NEfTe1AN8QZBgX_TKUoZ3i3nFwBjunUv4OYH4PuC_XNtL0kx--gkJj5mDrszQ"
        //   ,{path: "/", secure: true, expires: 60 * 60 * 2}
        // );
        // setCookie(
        //   "CognitoIdentityServiceProvider.5uk4dc2q76f3aqi6lgotacd195.+84326034561.accessToken",
        //   "eyJraWQiOiJocnU2azNtdXJvNnJ4ZzhZeTZocE9vWVQrcmp2bUZCMDlaNWd1YXMybGZFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0YmQ2MzU1ZC05ZmQ5LTQ4NTItYjZmYy05MTA3NmRiOGU4NDkiLCJjb2duaXRvOmdyb3VwcyI6WyJtZXJjaGFudCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfanZlSGZzSjVZIiwiY2xpZW50X2lkIjoiNXVrNGRjMnE3NmYzYXFpNmxnb3RhY2QxOTUiLCJvcmlnaW5fanRpIjoiOGUwNTI4NzktNTA0YS00ZDE3LTg3ZTktOTc1NzJlMGZjZjgxIiwiZXZlbnRfaWQiOiI1YmVjMjY4Mi1kYTMwLTQ2YzAtYjZmNy1mOGMyOTMyZGI2M2MiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzE5ODA1NDY5LCJleHAiOjE3MTk4MTI2NjksImlhdCI6MTcxOTgwNTQ2OSwianRpIjoiMTk1OGNkOGUtM2U4MS00YzAzLThlMTItNzllOTdlNDk0NWFlIiwidXNlcm5hbWUiOiJ2LXItMTcxODk1NTE5MjU1MCJ9.UT6xiXqNJiBGG6jnwSMPtp8Q0Nj97c3kFy4j6Pvmw7MHciI3OELd1M1P6FgSJHNvlAuDEOad6P302NtmeJMi76H5jo907lXV96BtU5OrMur_Lz-99-kujJHcRgMnldpbctD5MkYkeMsdp-dYde1dhdphBn1bvECN_zWY2PawJzxl-rtyFxTW8q7_WV6ma0_q0pp2e7STlL7SWxs57FFoOH4zvIo1RvSY6hIsRTWXn6LRmjXBuJgFe7s-yki3JruqT2syhv8Q7QW5zNqk5H1NG-g9CddQvw8VVjlEKrwzkBKguCVod1jEwYCdwrVR47oq3Z-xFW-iElSuPEUpLgfZqQ",
        //   { path: "/", secure: true, expires: 2 }
        // );
        const currentUser = await getCurrentUser();

        setCookie("User", JSON.stringify(currentUser), {
          expires: 2,
          path: "/main",
          secure: true,
        });

        message.success("Login Successfully", 2, () =>
          router.push("/main/dashboard")
        );
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
