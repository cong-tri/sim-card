/** @format */
"use client";
import React, { useState } from "react";
import { Col, Modal, Row, QRCode, Card } from "antd";
import Image from "next/image";
import e_sim1 from "../../../../public/images/e_sim1.jpg";
import e_sim2 from "../../../../public/images/e_sim2.jpg";
import e_sim3 from "../../../../public/images/e_sim3.jpg";
import iphone12 from "../../../../public/images/iphone-12.jpg";
import iphone13 from "../../../../public/images/iphone-13.webp";
import samsungFlip from "../../../../public/images/samsung-z-flip.webp";

const { Meta } = Card;

type ProductList = {
  proId?: number;
  proName?: string;
  proImg?: any;
  proDesc?: string;
  proPrice?: number;
  proData?: string;
  proExpire?: string;
};

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0);

  const productList: ProductList[] = [
    {
      proId: 1,
      proImg: e_sim1,
      proDesc: "E Sim Singapore",
      proName: "E SIM 1",
      proPrice: 130000,
      proData: "Unlimited data 500MP - 2GB daily",
      proExpire: "1 - 5 days",
    },
    {
      proId: 2,
      proImg: e_sim2,
      proDesc: "E Sim Singapore Signtel",
      proName: "E SIM 2",
      proPrice: 130000,
      proData: "5 GB / 1 day => 150GB",
      proExpire: "1 Month",
    },
    {
      proId: 3,
      proImg: e_sim3,
      proDesc: "E Sim Singapore Signtel",
      proName: "E SIM 3",
      proPrice: 130000,
      proData: "10GB Total Package No Daily Limit",
      proExpire: "1 Month",
    },
    {
      proId: 4,
      proImg: iphone12,
      proDesc: "Iphone 12",
      proName: "Iphone 12",
      proPrice: 130000,
      proData: "5 GB / 1 day => 150GB",
      proExpire: "1 Month",
    },
    {
      proId: 5,
      proName: "Iphone 13",
      proDesc: "Iphone 13",
      proImg: iphone13,
      proPrice: 130000,
      proData: "5 GB / 1 day => 150GB",
      proExpire: "1 Month",
    },
    {
      proId: 6,
      proName: "Samsung Z Flip",
      proDesc: "Samsung Z Flip",
      proImg: samsungFlip,
      proPrice: 130000,
      proData: "5 GB / 1 day => 150GB",
      proExpire: "1 Month",
    },
  ];

  const proData: any = productList.find(({ proId }) => {
    return proId === (id ? id : null);
  });
  return (
    <>
      <Row align={"middle"} justify={"center"}>
        {productList.map((product: any, index: any) => {
          return (
            <>
              <Col
                key={index}
                // span={6}
                xs={24}
                md={10}
                lg={6}
                className="text-center border border-gray-400 rounded-xl m-6 p-4"
                role="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setId(product.proId);
                }}
              >
                <Card
                  hoverable
                  style={{ width: "100%", height: 350 }}
                  cover={
                    <Image
                      alt={product.proDesc}
                      src={product.proImg}
                      quality={100}
                      height={200}
                      className="w-full h-64"
                    />
                  }
                >
                  <Meta
                    title={product.proName}
                    description={
                      <>
                        <p>{product.proDesc}</p>
                      </>
                    }
                  />
                </Card>
              </Col>
              <Modal
                title="Scan QR"
                open={isModalOpen}
                footer={false}
                centered
                width={500}
                onCancel={() => setIsModalOpen(false)}
              >
                {proData !== undefined ? (
                  <>
                    <Row>
                      <Col span={10}>
                        <QRCode
                          type="svg"
                          value={`product ${proData.proId}\nname: ${proData.proName}\ndescription: ${proData.proDesc}\nprice: ${proData.proPrice}\ndata: ${proData.proData}\nexpire: ${proData.proExpire}\nvendor_id: 1`}
                        />
                      </Col>
                      <Col span={14}>
                        <p>Information:</p>
                        <p>product id: {proData.proId}</p>
                        <p>product name: {proData.proName}</p>
                        <p>product desc: {proData.proDesc}</p>
                        <p>
                          product price: {proData.proPrice}
                        </p>
                        <p>product data: {proData.proData}</p>
                        <p>product expire: {proData.proExpire}</p>
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </Modal>
            </>
          );
        })}
      </Row>
    </>
  );
}
