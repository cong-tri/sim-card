/** @format */

import SignInForm from "./SignInForm";
import Title from "antd/es/typography/Title";

export default async function SignIn() {
  
  return (
    <>
      <div className="container flex items-center justify-center h-full">
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

