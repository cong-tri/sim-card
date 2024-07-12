"use client";
import React, { useContext, useState } from "react";
import { MainContext } from "@/context/MainProvider";
import Image from "next/image";
import { UserContext } from "@/context/UserProvider";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import Title from "antd/es/typography/Title";

export default function QRCodeVendor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const data: any = useContext(UserContext);

  const { userId, signInDetails }: any = useContext(MainContext);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open QR CODE</Button>
      <Modal
        title="QR CODE"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
        footer={
          <>
            <Button type="primary" danger onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </>
        }
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
            <Button htmlType="button" onClick={() => setIsModal(true)}>
              Share
            </Button>
            <Modal
              title="Share QR code"
              open={isModal}
              onCancel={() => setIsModal(false)}
              onClose={() => setIsModal(false)}
              footer={
                <>
                  <Button
                    type="primary"
                    danger
                    onClick={() => setIsModal(false)}
                  >
                    Close
                  </Button>
                </>
              }
            >
              <Form
                name="basic"
                autoComplete="off"
                onFinish={(values) => {
                  navigator.clipboard.writeText(values.url);
                  message.success("Success copy to clipboard.", 2);
                }}
                style={{ width: "100%" }}
              >
                <Row align={"middle"} gutter={16}>
                  <Col span={18}>
                    <Form.Item
                      name="url"
                      initialValue={
                        "https://sim-card-seven.vercel.app/images/qrcode.png"
                      }
                    >
                      <Input disabled size={"large"} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button htmlType="submit">
                        Copy url
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Col>
          <Col>
            <Button
              type="primary"
              href={"/images/qrcode.png"}
              download={true}
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
//https://sim-card-seven.vercel.app/images/qrcode.png
