"use client";

import React from "react";
import { useUserContext } from "@/context/UserProvider";
import { Table, Typography } from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";

const columns: TableProps["columns"] = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },
];

const { Text } = Typography;

export default function UserTransaction() {
  const { transaction } = useUserContext();
  
  return (
    <>
      <div className="my-8 px-14">
        <Table
          columns={columns}
          dataSource={transaction?.map((item, index) => {
            return {
              key: `${index + 1}`,
              name: item.product,
              date: moment(item.date).format("MMMM Do YYYY, h:mm:ss a"),
              amount:
                item.amount < 0 ? (
                  <Text type="danger">
                    {item.amount} {item.currency}
                  </Text>
                ) : (
                  <Text type="success">
                    +{item.amount} {item.currency}
                  </Text>
                ),
              status: item.read ? (
                <Text>Read</Text>
              ) : (
                <Text type="danger">Unread</Text>
              ),
              description: (
                <>
                  <Text>
                    Transaction ID: {item.id}. <br />
                    Product Name: <Text strong>{item.product}</Text>. <br />
                    Service: {item.service}. <br />
                    Date: {moment(item.date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}. <br />
                    Amount:{" "}
                    {item.amount < 0 ? (
                      <Text type="danger">
                        {item.amount} {item.currency}
                      </Text>
                    ) : (
                      <Text type="success">
                        +{item.amount} {item.currency}
                      </Text>
                    )}
                  </Text>
                </>
              ),
            };
          })}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          title={() => {
            return <Title>Transaction</Title>;
          }}
        />
      </div>
    </>
  );
}
