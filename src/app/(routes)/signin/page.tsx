/** @format */

import Title from "antd/es/typography/Title";

import { authenticate } from "@/app/lib/authenticate";
import SignInForm from "./SignInForm";

export default async function SignIn() {
  return (
    <>
      <div className='container flex items-center justify-center h-full'>
        <div className='py-24'>
          <Title level={1} className='text-center'>
            Sign In Page
          </Title>
          <SignInForm authenticate={authenticate} />
        </div>
      </div>
    </>
  );
}
