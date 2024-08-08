"use client";

import React, { useState } from "react";

import { Button, Col, Modal, QRCode, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";

import { useUserContext } from "@/context/UserProvider";
import { useMainContext } from "@/context/MainProvider";

import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;

export default function QRCodeVendor() {
  const { qrcode } = useUserContext();
  const { data } = useMainContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const queryClient = useQueryClient();
  return (
    <>
      <Button
        onClick={async () => {
          await queryClient.refetchQueries({
            queryKey: ["qrcode"],
            type: "active",
          });

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
            <QRCode value={"/?token=" + qrcode?.ios} size={200} />
          </Col>
          <Col span={12} className="text-center">
            <Title level={4}>ANDROID</Title>
            <QRCode value={"/?token=" + qrcode?.android} size={200} />
          </Col>
        </Row>
        <div className="w-full block mx-auto rounded-2xl p-4 bg-gray-100 text-center">
          <Title>
            Vendor: {data?.userAttributes?.given_name}{" "}
            {data?.userAttributes?.family_name}
          </Title>
          <Title level={4}>Phone: {data?.userAttributes?.phone_number}</Title>
          <Title level={4}>ID: {data?.currentUser?.userId ?? ""}</Title>
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
