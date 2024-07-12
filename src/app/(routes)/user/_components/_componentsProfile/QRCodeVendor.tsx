"use client";
import React, { useContext, useState } from "react";
import { MainContext } from "@/context/MainProvider";
import Image from "next/image";
import { UserContext } from "@/context/UserProvider";
import { Button, Col, Modal, Row } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";

export default function QRCodeVendor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data: any = useContext(UserContext);

  const { userId, signInDetails }: any = useContext(MainContext);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open QR CODE</Button>
      <Modal
        title="QR CODE"
        open={isModalOpen}
        footer={<>
          <Button type="primary" danger onClick={() => setIsModalOpen(false)}>Close</Button>
        </>}
        width={500}
      >
        <Row align={"top"} gutter={20} justify={"center"}>
          <Col span={12} className="text-center">
            <Title level={4}>IOS</Title>
            <Image
              src={data?.ios}
              alt="QR Code for ios"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
          <Col span={12} className="text-center">
            <Title level={4}>ANDROID</Title>
            <Image
              src={data?.android}
              alt="QR Code for android"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
        </Row>
        <div className="w-full block mx-auto rounded-2xl p-4 bg-gray-100 text-center">
          <Title>DAO CONG TRI</Title>
          <Title level={4}>
            Phone: {!signInDetails?.loginId ? "" : signInDetails?.loginId}
          </Title>
          <Title level={4}>ID: {!userId ? "" : userId}</Title>
        </div>
        <Row gutter={20} align={"middle"} justify={"center"} className="mt-5">
          <Col>
            <Button htmlType="button">Share</Button>
          </Col>
          <Col>
            <Button
              type="primary"
              href={"/images/qrcode.png"}
              // download={true}
              target="_blank"
              htmlType="button"
            >
              Download
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
