/** @format */
import React from "react";
import { Avatar, Button, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import UpdateProfile from "./UpdateProfileForm";
import { logout } from "@/app/lib/authenticate";

export default function VendorProfilePage() {
  return (
    <>
      <Row className='w-full px-14' gutter={20} align={"top"}>
        <Col span={16}>
          <div className='border-2 rounded-2xl py-10 px-4'>
            <div className='rounded-2xl bg-blue-500 p-4 mb-5'>
              <Title level={2} className='pb-2 mb-0'>
                Edit Profile
              </Title>
              <Title level={4} className='m-0'>
                Complete Your Profile
              </Title>
            </div>
            <UpdateProfile />
            <form action={logout}>
              <div className='text-right'>
                <Button type='primary' htmlType='submit' danger>
                  Check Out
                </Button>
              </div>
            </form>
          </div>
        </Col>
        <Col span={8}>
          <div className='border-2 rounded-2xl py-14'>
            <div className='text-center'>
              <Avatar size={100} icon={<UserOutlined />} />
              <Title level={4} className='mt-5 font-normal'>
                Vendor
              </Title>
              <Title level={4}>Đào Công Trí</Title>
              <Button type='primary' htmlType='button'>
                Follow
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
