"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { DataUserProvider, Transaction } from "@/types/types";
import { Button, List, Modal } from "antd";
import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";

export default function UserTransaction() {
  const dataUserContext = useContext(UserContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction[]>();
  const [detailTransaction, setDetailTransaction] = useState<any>();
  
  useEffect(() => {
    if (!dataUserContext) return;
    else {
      const data = dataUserContext as DataUserProvider;
      if (!data.transaction) return;
      else setTransaction(data.transaction);
    }
  }, [dataUserContext]);

  const listTransaction = transaction?.map((item, index) => {
    return {
      key: index,
      title: item.read
        ? `Transaction ${index + 1}`
        : `Transaction ${index + 1} (Unread)`,
      description: `You purchased ${item.product}, service: ${item.service}.`,
      details: (
        <>
          <Typography>
            You already have payment a transaction: <br />
            ID: {item.id}. <br />
            Product Name: {item.product}. <br />
            Service: {item.service}. <br />
            Date: {formatDatetime(item.date as string)}. <br />
            Cost: {item.amount} {item.currency}
          </Typography>
        </>
      ),
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
                    onClick={() => {
                      setIsModalOpen(true);
                      if (!listTransaction) return;
                      else {
                        if (!listTransaction[index].details) return;
                        else
                          setDetailTransaction(listTransaction[index].details);
                      }
                    }}
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
                    {detailTransaction ?? ""}
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

function formatDatetime(datetime: string) {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
    timeZone: "UTC", // Ensure the time is displayed in UTC
  });
  return formattedDate;
}
