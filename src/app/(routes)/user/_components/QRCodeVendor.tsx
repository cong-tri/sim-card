"use client";

import React, { useContext, useEffect, useState } from "react";
import { useCallQrcodeQuery } from "@/hooks/socket/useAuth";
import { UserContext } from "@/context/UserProvider";
import { Button, Col, Modal, QRCode, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import {
  CurrentUser,
  DataMainProvider,
  Qrcode,
  UserAttributes,
} from "@/types/types";
import { MainContext } from "@/context/MainProvider";

const { Text } = Typography;

export default function QRCodeVendor() {
  const dataUserContext = useContext(UserContext);
  const dataMainContext = useContext(MainContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [qrcode, setQRCode] = useState<Qrcode>();
  const [userAttributes, setUserAttributes] = useState<UserAttributes>();
  const [user, setUser] = useState<CurrentUser>();

  useEffect(() => {
    if (!dataMainContext) return;
    else {
      const data = dataMainContext as DataMainProvider;
      if (!data) return;
      if (!data.user || !data.userAttributes) return;
      else {
        setUser(data.user);
        setUserAttributes(data.userAttributes);
      }
    }
  }, [dataMainContext, user, userAttributes]);

  useEffect(() => {
    if (!dataUserContext) return;
    else {
      setQRCode(dataUserContext as Qrcode);
    }
  }, [dataUserContext, qrcode]);

  if (!user || !userAttributes || !qrcode) return;

  return (
    <>
      <Button
        onClick={() => {
          useCallQrcodeQuery;
          setIsModalOpen(true);
        }}
      >
        Open QR CODE
      </Button>
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
            <QRCode value={qrcode.ios} size={200}/>
          </Col>
          <Col span={12} className="text-center">
            <Title level={4}>ANDROID</Title>
            <QRCode value={qrcode.android} size={200}/>
          </Col>
        </Row>
        <div className="w-full block mx-auto rounded-2xl p-4 bg-gray-100 text-center">
          <Title>
            Vendor: {userAttributes.given_name} {userAttributes.family_name}
          </Title>
          <Title level={4}>Phone: {userAttributes.phone_number}</Title>
          <Title level={4}>ID: {user.userId}</Title>
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
              <Title level={4}>
                Link:{" "}
                <Text copyable>
                  https://sim-card-seven.vercel.app/images/qrcode.jpg
                </Text>
              </Title>
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
