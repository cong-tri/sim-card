/** @format */

import React from "react";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { FieldTimeOutlined } from "@ant-design/icons";
import RevenueChart from "./RevenueChart";
import WebsiteViewsChart from "./WebsiteViewsChart";
import DailySalesChart from "./DailySalesChart";
import SalesByAgeChart from "./SalesByAgeChart";
export default function Analytics() {
  return (
    <>
      <Row className='my-8' align={"middle"} justify={"center"}>
        <Col span={11} className='border border-gray-400 rounded-xl mr-8'>
          <RevenueChart />
          <Title level={3} className='pl-8'>
            Revenue
          </Title>
          <p className='text-gray-400 text-lg pl-8 pb-4'>
            <FieldTimeOutlined /> Just update
          </p>
        </Col>
        <Col span={11} className='border border-gray-400 rounded-xl'>
          <WebsiteViewsChart />
          <Title level={3} className='pl-8'>
            Website Views
          </Title>
          <p className='text-gray-400 text-lg pl-8 pb-4'>
            <FieldTimeOutlined /> Just update
          </p>
        </Col>
      </Row>
      <Row className='my-8' align={"middle"} justify={"center"}>
        <Col span={11} className='border border-gray-400 rounded-xl mt-8 mr-8'>
          <DailySalesChart />
          <Title level={3} className='pl-8'>
            Daily Sales
          </Title>
          <p className='text-gray-400 text-lg pl-8 pb-4'>
            <FieldTimeOutlined /> Just update
          </p>
        </Col>
        <Col span={11} className='border border-gray-400 rounded-xl mt-8'>
          <SalesByAgeChart />
          <Title level={3} className='pl-8'>
            Sales By Age
          </Title>
          <p className='text-gray-400 text-lg pl-8 pb-4'>
            <FieldTimeOutlined /> Just update
          </p>
        </Col>
      </Row>
    </>
  );
}
