"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { DataUserProvider, Transaction } from "@/types/types";
import { Button, List, Modal } from "antd";
import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";

export default function UserTransaction() {
  const data = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction[]>();

  useEffect(() => {
    const getData = async (data: DataUserProvider) => {
      const transactionAsync: Promise<Transaction[]> = new Promise(
        (resolve) => {
          if (data.transaction != null) {
            resolve(data.transaction);
          }
        }
      );
      const dataTransaction = await transactionAsync;
      setTransaction(dataTransaction);
    };
    getData(data as DataUserProvider);
  }, [data]);

  const listTransaction = transaction?.map((item, index) => {
    return {
      key: index,
      title: item.read
        ? `Transaction ${index + 1}`
        : `Transaction ${index + 1} (Unread)`,
      description: `You purchased ${item.product}, service: ${item.service}.`,
      details: (<>
        <Typography>
          You already have payment a transaction: <br />
          ID: {item.id}. <br />
          Product Name: {item.product}. <br />
          Service: {item.service}. <br />
          Date: {item.date as string}. <br />
          Cost: {item.amount} {item.currency}
        </Typography>
      </>)
    };
  });
  return (
    <>
      <div className="my-8 px-14">
        <List
          size="large"
          header={<Title>Transaction</Title>}
          itemLayout="horizontal"
          bordered
          dataSource={listTransaction}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <>
                  <Button
                    htmlType="button"
                    type="primary"
                    key={index}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Read
                  </Button>
                  <Modal
                    title="Transaction Information"
                    open={isModalOpen}
                    footer={
                      <Button
                        type="primary"
                        danger
                        htmlType="button"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </Button>
                    }
                    onCancel={() => setIsModalOpen(false)}
                  >
                    {item.details}
                  </Modal>
                </>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={<Typography>{item.description}</Typography>}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
