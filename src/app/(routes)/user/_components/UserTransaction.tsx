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

  // in order to show the latest transaction into layout
  const reserveTransaction = [...(transaction ?? [])].reverse();
  const totalAmount = reserveTransaction.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  return (
    <>
      <div className="my-8 px-14">
        <Table
          columns={columns}
          dataSource={reserveTransaction?.map((item, index) => {
            return {
              key: `${index + 1}`,
              name: item.product,
              date: moment(item.date).format("MMMM Do YYYY, h:mm:ss A"),
              amount: (
                <Text type={item.amount < 0 ? "danger" : "success"}>
                  {item.amount} {item.currency}
                </Text>
              ),

              status: (
                <Text type={item.read ? "secondary" : "danger"}>{item.read ? "Read" : "Unread"}</Text>
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
            expandRowByClick: true,
          }}
          size="large"
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  Note
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={5}>
                  This is a list of transactions from the previous 10 days to
                  the current date.
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  Total amount within 10 days
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={5}>
                  <Text type={totalAmount < 0 ? "danger" : "success"}>
                    {totalAmount} VND
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          title={() => {
            return <Title>Transaction</Title>;
          }}
        />
      </div>
    </>
  );
}
