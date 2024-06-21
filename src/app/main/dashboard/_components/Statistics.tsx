/** @format */

import React from "react";
import {
  BarChartOutlined,
  DollarOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";

export default function Statistics() {
  return (
    <Row align={"middle"} justify={"center"}>
      <Col span={5} className='border border-gray-500 rounded-xl mr-6'>
        <Row align={"middle"} className='border-b border-gray-300 py-4 mx-2'>
          <Col span={12}>
            <div className='bg-black py-5 rounded-xl text-center w-16 text-white'>
              <EyeOutlined className='text-2xl' />
            </div>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-lg text-gray-400'>Views</p>
              <Title level={2}>300</Title>
            </div>
          </Col>
        </Row>
        <p className='text-lg text-gray-400 py-4 px-2'>
          <span className='text-green-600 font-bold'>+55%</span> than last week
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mr-6'>
        <Row align={"middle"} className='border-b border-gray-300 py-4 mx-2'>
          <Col span={12}>
            <div className='bg-blue-500 py-5 rounded-xl text-center w-16 text-white'>
              <BarChartOutlined className='text-2xl' />
            </div>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-lg text-gray-400'>Today&apos;s User </p>
              <Title level={2}>2,300</Title>
            </div>
          </Col>
        </Row>
        <p className='text-lg text-gray-400 py-4 px-2'>
          <span className='text-green-600 font-bold'>+10%</span> than last month
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mr-6'>
        <Row align={"middle"} className='border-b border-gray-300 py-4 mx-2'>
          <Col span={10}>
            <div className='bg-green-500 py-5 rounded-xl text-center w-16 text-white'>
              <DollarOutlined className='text-2xl' />
            </div>
          </Col>
          <Col span={14}>
            <div className='text-right'>
              <p className='text-lg text-gray-400'>Revenue</p>
              <Title level={2}>$235.000</Title>
            </div>
          </Col>
        </Row>
        <p className='text-lg text-gray-400 py-4 px-2'>
          <span className='text-green-600 font-bold'>+3%</span> than last month
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl'>
        <Row align={"middle"} className='border-b border-gray-300 py-4 mx-2'>
          <Col span={12}>
            <div className='bg-black py-5 rounded-xl text-center w-16 text-white'>
              <UserAddOutlined className='text-2xl' />
            </div>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-lg text-gray-400'>Followers</p>
              <Title level={2}>+100</Title>
            </div>
          </Col>
        </Row>
        <p className='text-lg text-gray-400 py-4 px-2'>Just update</p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mt-8 mr-6'>
        <Row align={"top"} className='px-4 pt-4'>
          <Col span={12}>
            <p className='text-lg font-bold text-gray-500'>Sales</p>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-base text-gray-400'>6 May - 7 May</p>
            </div>
          </Col>
        </Row>
        <Title level={2} className='pl-4'>
          $230,220
        </Title>
        <p className='text-lg text-gray-400 pl-4 pb-3'>
          <span className='text-green-600 font-bold'>+20%</span> since last
          month
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mt-8 mr-6'>
        <Row align={"top"} className='px-4 pt-4'>
          <Col span={12}>
            <p className='text-lg font-bold text-gray-500'>Customers</p>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-base text-gray-400'>6 May - 7 May</p>
            </div>
          </Col>
        </Row>
        <Title level={2} className='pl-4'>
          3,200
        </Title>
        <p className='text-lg text-gray-400 pl-4 pb-3'>
          <span className='text-green-600 font-bold'>+12%</span> since last
          month
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mt-8 mr-6'>
        <Row align={"top"} className='px-4 pt-4'>
          <Col span={12}>
            <p className='text-lg font-bold text-gray-500'>Avg Revenue</p>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-base text-gray-400'>6 May - 7 May</p>
            </div>
          </Col>
        </Row>
        <Title level={2} className='pl-4'>
          $1.200
        </Title>
        <p className='text-lg text-gray-400 pl-4 pb-3'>
          <span className='text-green-600 font-bold'>+$200</span> since last
          month
        </p>
      </Col>
      <Col span={5} className='border border-gray-500 rounded-xl mt-8'>
        <Row align={"top"} className='px-4 pt-4'>
          <Col span={12}>
            <p className='text-lg font-bold text-gray-500'>Daily Sales</p>
          </Col>
          <Col span={12}>
            <div className='text-right'>
              <p className='text-base text-gray-400'>6 May - 7 May</p>
            </div>
          </Col>
        </Row>
        <Title level={2} className='pl-4'>
          $8.200
        </Title>
        <p className='text-lg text-gray-400 pl-4 pb-3'>
          <span className='text-green-600 font-bold'>+$200</span> since
          yesterday
        </p>
      </Col>
    </Row>
  );
}
