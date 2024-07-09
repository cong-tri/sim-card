"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserProvider";
import { Button, Col, Modal, Row } from "antd";
import Title from "antd/es/typography/Title";

export default function QRCodeVendor() {
  const data: any = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open QR CODE
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={500}
      >
        <Row align={"top"} gutter={20} justify={"center"}>
          <Col span={12}>
            <Title level={4}>IOS</Title>
            <Image
              src={data.ios}
              alt="QR Code for ios"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
          <Col span={12}>
            <Title level={4}>ANDROID</Title>
            <Image
              src={data.android}
              alt="QR Code for android"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
