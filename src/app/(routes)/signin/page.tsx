/** @format */

import Title from "antd/es/typography/Title";
import SignInForm from "./SignInForm";

export default function SignIn() {
  
  return (
    <>
      <div className="w-full flex items-center justify-center h-[100vh]">
        <div className="py-24">
          <Title level={1} className="text-center">
            Sign In Page
          </Title>
          <SignInForm /> 
        </div>
      </div>
    </>
  );
}

