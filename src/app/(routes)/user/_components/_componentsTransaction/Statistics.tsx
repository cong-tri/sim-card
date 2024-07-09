/** @format */
"use client"
import React, { useContext } from "react";
import {
  BarChartOutlined,
  DollarOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { TransactionContext } from "@/context/TransactionProvider";

export default function Statistics() {
  const data: any = useContext(TransactionContext)
  
  const totalAmount = data.reduce((sum: any, item: any) => sum + item.amount, 0);
  const averageAmount = totalAmount / data.length;

  const listStatistics = {
    statisticsRow1: [
      {
        id: 1,
        icon: <EyeOutlined className="text-2xl" />,
        label: "Views",
        statisNumber: "300",
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+55%</span> than last
            week
          </>
        ),
      },
      {
        id: 2,
        icon: <BarChartOutlined className="text-2xl" />,
        label: <>Today&apos;s User</>,
        statisNumber: `${data.length}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+10%</span> than last
            month
          </>
        ),
      },
      {
        id: 3,
        icon: <DollarOutlined className="text-2xl" />,
        label: "Revenue",
        statisNumber: `$${totalAmount}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+3%</span> than last
            month
          </>
        ),
      },
      {
        id: 4,
        icon: <UserAddOutlined className="text-2xl" />,
        label: "Followers",
        statisNumber: "+100",
        statisFooter: "Just update",
      },
    ],
    statisticsRow2: [
      {
        id: 1,
        label: "Sales",
        statisDate: "6 May - 7 May",
        statisNumber: `$${totalAmount}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+20%</span> since last
            month
          </>
        ),
      },
      {
        id: 2,
        label: "Customers",
        statisDate: "6 May - 7 May",
        statisNumber: `${data.length}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+12%</span> since last
            month
          </>
        ),
      },
      {
        id: 3,
        label: "Avg Revenue",
        statisDate: "6 May - 7 May",
        statisNumber: `$${averageAmount}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+$200</span> since last
            month
          </>
        ),
      },
      {
        id: 4,
        label: "Daily Sales",
        statisDate: "6 May - 7 May",
        statisNumber: `$${averageAmount}`,
        statisFooter: (
          <>
            <span className="text-green-600 font-bold">+$200</span> since
            yesterday
          </>
        ),
      },
    ],
  };

  return (
    <Row align={"middle"} justify={"center"}>
      {listStatistics.statisticsRow1.map((items: any) => {
        return (
          <>
            <Col
              span={5}
              className={`border border-gray-500 rounded-xl ${
                items.id < 4 ? "mr-6" : ""
              }`}
              key={items.id}
            >
              <Row
                align={"middle"}
                className="border-b border-gray-300 py-4 mx-2"
              >
                <Col span={12}>
                  <div
                    className={`${
                      items.id === 1
                        ? "bg-black"
                        : items.id === 2
                        ? "bg-blue-500"
                        : items.id === 3
                        ? "bg-green-500"
                        : "bg-black"
                    } py-5 rounded-xl text-center w-16 text-white`}
                  >
                    {items.icon}
                  </div>
                </Col>
                <Col span={12} className="text-right">
                  <p className="text-lg text-gray-400">{items.label}</p>
                  <Title level={3}>{items.statisNumber}</Title>
                </Col>
              </Row>
              <p className="text-lg text-gray-400 py-4 px-2">
                {items.statisFooter}
              </p>
            </Col>
          </>
        );
      })}
      {listStatistics.statisticsRow2.map((items: any) => {
        return (
          <>
            <Col
              span={5}
              key={items.id}
              className={`border border-gray-500 rounded-xl mt-8 ${
                items.id < 4 ? "mr-6" : ""
              }`}
            >
              <Row align={"top"} className="px-4 pt-4">
                <Col span={12}>
                  <p className="text-lg font-bold text-gray-500">
                    {items.label}
                  </p>
                </Col>
                <Col span={12} className="text-right">
                  <p className="text-base text-gray-400">{items.statisDate}</p>
                </Col>
              </Row>
              <Title level={2} className="pl-4">
                {items.statisNumber}
              </Title>
              <p className="text-lg text-gray-400 pl-4 pb-3">
                {items.statisFooter}
              </p>
            </Col>
          </>
        );
      })}
    </Row>
  );
}
