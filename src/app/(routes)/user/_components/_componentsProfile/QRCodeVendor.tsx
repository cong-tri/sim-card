"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import Image from "next/image";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import Title from "antd/es/typography/Title";
import { CurrentUser, DataMainProvider, DataUserProvider, Qrcode, UserAttributes } from "@/types/types";

export default function QRCodeVendor({ props }: any) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [qrcode, setQRCode] = useState<Qrcode>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes>();
  const [user, setUser] = useState<CurrentUser>();

  const dataUserContext = useContext(UserContext);

  useEffect(() => {
    const getQrcode = async () => {
      if (!dataUserContext) {
      } else {
        const data = dataUserContext as DataUserProvider;
        if (!data.qrcode) return;
        else setQRCode(data.qrcode);
      }
    };
    getQrcode();
  }, [dataUserContext]);

  useEffect(() => {
    if (!props) return
    else{
      const data = props as DataMainProvider;
      if (!data.user || !data.userAttributes) return
      else {
        setUser(data.user)  
        setUserAttributes(data.userAttributes)
      }
    }
      
  }, [props])
  
  if (!user || !userAttributes || !qrcode) return;

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open QR CODE</Button>
      <Modal
        title="QR CODE"
        open={isModalOpen}
        centered
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
              src={qrcode?.ios as string}
              alt="QR Code for ios"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
          <Col span={12} className="text-center">
            <Title level={4}>ANDROID</Title>
            <Image
              src={qrcode?.android as string}
              alt="QR Code for android"
              width={200}
              height={200}
              quality={100}
            />
          </Col>
        </Row>
        <div className="w-full block mx-auto rounded-2xl p-4 bg-gray-100 text-center">
          <Title>
            Vendor: {userAttributes?.family_name ?? ""} {userAttributes?.given_name ?? ""}
          </Title>
          <Title level={4}>
            Phone:{" "}
            {userAttributes?.phone_number ?? ""}
          </Title>
          <Title level={4}>ID: {user?.userId ?? ""}</Title>
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
                        "https://sim-card-seven.vercel.app/images/qrcode.jpg"
                      }
                    >
                      <Input disabled size={"large"} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button htmlType="submit">Copy url</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Col>
          <Col>
            <Button
              type="primary"
              href={"/images/qrcode.jpg"}
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
